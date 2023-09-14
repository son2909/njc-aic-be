import { HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ModuleRef } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ApiError } from '../../filter/api.error';
import { AccountService } from '../accounts/accounts.service';

import { CognitoIdentityServiceProvider } from 'aws-sdk';
import {
  AuthenticateMFARequestDto,
  AuthenticateRequestDto,
  DisableMFAUser,
  EnableMFAUser,
  RegisterRequestDto,
  VerifyEmailRegisterRequestDto,
} from './dto';

import {
  AdminInitiateAuthRequest,
  AdminInitiateAuthResponse,
} from 'aws-sdk/clients/cognitoidentityserviceprovider';
import { OperationCodeEnum, Role } from 'src/enum';
let cognito = null;

@Injectable()
export class AuthCognitoNewService {
  // private userPool: CognitoUserPool;
  private accountService: AccountService;

  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
    private moduleRef: ModuleRef,
  ) {
    cognito = new CognitoIdentityServiceProvider({
      region: this.configService.get('AWS_COGNITO_REGION'),
      maxRetries: 3,
      httpOptions: { timeout: 30000, connectTimeout: 5000 },
      accessKeyId: this.configService.get('AWS_ACESS_KEY_ID'),
      secretAccessKey: this.configService.get('AWS_SECRET_ACESS_KEY'),
    });
  }

  onModuleInit() {
    this.accountService = this.moduleRef.get(AccountService);
  }

  /**
   *
   * @param authRegisterRequest
   * @returns
   */
  async register(authRegisterRequest: RegisterRequestDto) {
    return this.accountService.createAccount({
      operation_code: OperationCodeEnum.ADD,
      account_classification: Role.ADMIN,
      address: '',
      first_name: authRegisterRequest.name,
      given_name: authRegisterRequest.name,
      mail_address: authRegisterRequest.email,
      mi_id: null,
      telephone_number: '',
      account_id: null,
      unit_price: 0,
    });
  }

  async registerCognito(authRegisterRequest: RegisterRequestDto) {
    console.log(authRegisterRequest);
    const { name, email, password, account_id } = authRegisterRequest;
    let params = {
      ClientId: this.configService.get('AWS_COGNITO_CLIENT_ID') /* required */,
      Password: password /* required */,
      Username: name /* required */,
      UserAttributes: [
        {
          Name: 'name' /* required */,
          Value: name,
        },
        {
          Name: 'email' /* required */,
          Value: email,
        },
        {
          Name: 'custom:account_id' /* required */,
          Value: account_id.toString(),
        },
      ],
    };
    let signUp = await cognito.signUp(params).promise();
    await this.adminConfirmSignUp(name);

    return signUp;
  }

  async adminConfirmSignUp(userName: string) {
    const params = {
      UserPoolId: this.configService.get('AWS_COGNITO_USER_POOL_ID'),
      Username: userName,
    };
    return cognito.adminConfirmSignUp(params).promise();
  }

  /**
   *
   * @param user
   * @returns
   */
  async login(user: AuthenticateRequestDto) {
    const { name, password } = user;

    const params: AdminInitiateAuthRequest = {
      ClientId: this.configService.get('AWS_COGNITO_CLIENT_ID'),
      UserPoolId: this.configService.get('AWS_COGNITO_USER_POOL_ID'),
      AuthFlow: 'ADMIN_NO_SRP_AUTH',
      AuthParameters: {
        USERNAME: name,
        PASSWORD: password,
      },
    };

    try {
      const initiateAuthResponse = await cognito
        .adminInitiateAuth(params)
        .promise();
      console.log('[AUTH]', initiateAuthResponse);

      if (initiateAuthResponse.ChallengeName) {
        return initiateAuthResponse;
      }
      return this.processingInitiateAuthResponse(name, initiateAuthResponse);
    } catch (err) {
      console.error(err);
      throw new ApiError(HttpStatus.UNAUTHORIZED, err.message);
    }
  }

  private async processingInitiateAuthResponse(
    name: string,
    initiateAuthResponse: AdminInitiateAuthResponse,
  ) {
    if (initiateAuthResponse && !initiateAuthResponse.AuthenticationResult) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: 'Signin fail, Username or password is wrong!',
        }),
      };
    }

    const userParams = {
      AccessToken: initiateAuthResponse?.AuthenticationResult.AccessToken,
    };
    const userData = await cognito.getUser(userParams).promise();

    const emailAttr = userData.UserAttributes.find((userAttribute) => {
      return userAttribute.Name == 'email';
    });

    const email = emailAttr.Value;
    const userCheck = await this.accountService.getUserByUsernameAndEmail(
      name,
      email,
    );
    const payload = {
      // ...result.accessToken,
      payload: { ...userCheck, ...initiateAuthResponse?.AuthenticationResult },
    };
    const accessToken = this.jwtService.sign(payload);
    return {
      accessToken,
    };
  }

  async loginMfa(authenticateMFARequestDto: AuthenticateMFARequestDto) {
    const { Session, totpToken, ChallengeParameters, ChallengeName } =
      authenticateMFARequestDto;
    const params = {
      ChallengeName: ChallengeName /* required */,
      ClientId: this.configService.get('AWS_COGNITO_CLIENT_ID') /* required */,
      UserPoolId: this.configService.get(
        'AWS_COGNITO_USER_POOL_ID',
      ) /* required */,
      ChallengeResponses: {
        SOFTWARE_TOKEN_MFA_CODE: totpToken,
        USERNAME: ChallengeParameters.USER_ID_FOR_SRP,
      },
      Session: Session,
    };
    const initiateAuthResponse = await cognito
      .adminRespondToAuthChallenge(params)
      .promise();
    return this.processingInitiateAuthResponse(
      ChallengeParameters.USER_ID_FOR_SRP,
      initiateAuthResponse,
    );
  }

  async associateSoftwareToken(cogAccessToken: string, session: string) {
    try {
      const params = {
        AccessToken: cogAccessToken,
        Session: session,
      };
      const secretCode = await cognito.associateSoftwareToken(params).promise();
      return secretCode;
    } catch (err) {
      console.error(err);
      throw new ApiError(HttpStatus.BAD_REQUEST, err.message);
    }
  }

  async enableMFAUser(
    cogAccessToken: string,
    userName: string,
    sessionCode: string,
    enableMFAUser: EnableMFAUser,
  ) {
    try {
      const params = {
        UserCode: enableMFAUser.totpCode /* required */,
        Session: sessionCode,
        AccessToken: cogAccessToken,
        // FriendlyDeviceName: enableMFAUser.friendlyDeviceName
        //   ? enableMFAUser.friendlyDeviceName
        //   : '',
      };
      const verifySoftwareTokenRes = await cognito
        .verifySoftwareToken(params)
        .promise();
      if (verifySoftwareTokenRes.Status == 'SUCCESS') {
        const paramsSetUserMFA = {
          UserPoolId: this.configService.get(
            'AWS_COGNITO_USER_POOL_ID',
          ) /* required */,
          Username: userName /* required */,
          SMSMfaSettings: null,
          SoftwareTokenMfaSettings: {
            Enabled: true,
            PreferredMfa: true,
          },
        };
        const setUserMFAPreference = await cognito
          .adminSetUserMFAPreference(paramsSetUserMFA)
          .promise();
        console.log(setUserMFAPreference);
      }
    } catch (err) {
      console.error(err);
      throw new ApiError(HttpStatus.BAD_REQUEST, err.message);
    }
  }

  async disableMFAUser(
    userName: string,
    cogAccessToken: string,
    disableMFAUser: DisableMFAUser,
  ) {
    try {
      const params = {
        UserCode: disableMFAUser.totpCode /* required */,
        AccessToken: cogAccessToken,
        FriendlyDeviceName: disableMFAUser.friendlyDeviceName
          ? disableMFAUser.friendlyDeviceName
          : null,
      };
      const verifySoftwareTokenRes = await cognito
        .verifySoftwareToken(params)
        .promise();
      if (verifySoftwareTokenRes.Status == 'SUCCESS') {
        const paramsSetUserMFA = {
          UserPoolId: this.configService.get(
            'AWS_COGNITO_USER_POOL_ID',
          ) /* required */,
          Username: userName /* required */,
          SMSMfaSettings: null,
          SoftwareTokenMfaSettings: {
            Enabled: false,
            PreferredMfa: false,
          },
        };
        const setUserMFAPreference = await cognito
          .adminSetUserMFAPreference(paramsSetUserMFA)
          .promise();
        console.log(setUserMFAPreference);
      } else {
        throw new ApiError(HttpStatus.BAD_REQUEST, 'invalid token.');
      }
    } catch (err) {
      console.error(err);
      throw new ApiError(HttpStatus.BAD_REQUEST, err.message);
    }
  }

  async adminDisableMFAUser(userName: string) {
    try {
      const paramsSetUserMFA = {
        UserPoolId: this.configService.get(
          'AWS_COGNITO_USER_POOL_ID',
        ) /* required */,
        Username: userName /* required */,
        SMSMfaSettings: null,
        SoftwareTokenMfaSettings: {
          Enabled: false,
          PreferredMfa: false,
        },
      };
      const setUserMFAPreference = await cognito
        .adminSetUserMFAPreference(paramsSetUserMFA)
        .promise();
      console.log(setUserMFAPreference);
    } catch (err) {
      console.error(err);
      throw new ApiError(HttpStatus.BAD_REQUEST, err.message);
    }
  }

  /**
   *
   * @param user
   * @returns
   */
  async verifyRegister(user: VerifyEmailRegisterRequestDto) {
    const { name, code } = user;
    const params = {
      ClientId: this.configService.get('AWS_COGNITO_CLIENT_ID') /* required */,
      ConfirmationCode: code /* required */,
      Username: name /* required */,
    };
    const confirmSignUp = await cognito.confirmSignUp(params).promise();
    return confirmSignUp;
  }

  async verifyPasswordCognito(user: AuthenticateRequestDto) {
    const { name, password } = user;

    const params: AdminInitiateAuthRequest = {
      ClientId: this.configService.get('AWS_COGNITO_CLIENT_ID'),
      UserPoolId: this.configService.get('AWS_COGNITO_USER_POOL_ID'),
      AuthFlow: 'ADMIN_NO_SRP_AUTH',
      AuthParameters: {
        USERNAME: name,
        PASSWORD: password,
      },
    };

    try {
      const initiateAuthResponse = await cognito
        .adminInitiateAuth(params)
        .promise();

      if (initiateAuthResponse.ChallengeName) {
        return initiateAuthResponse;
      }

      return true;
    } catch (err) {
      throw new ApiError(HttpStatus.BAD_REQUEST, err.message);
    }
  }

  async deleteUserCognito(username: string) {
    const params = {
      UserPoolId: this.configService.get('AWS_COGNITO_USER_POOL_ID'),
      Username: username,
    };
    return cognito.adminDeleteUser(params).promise();
  }
}
