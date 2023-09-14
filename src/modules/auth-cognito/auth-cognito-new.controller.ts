import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Get,
  Req,
} from '@nestjs/common';
import { AuthCognitoNewService } from './auth-cognito-new.service';
import {
  AuthenticateRequestDto,
  EnableMFAUser,
  CognitoUserRequestDto,
  VerifyEmailRegisterRequestDto,
  AssociateSoftwareTokenResponseDto,
  AssociateSoftwareTokenRequestDto,
  AuthenticateMFARequestDto,
  DisableMFAUser,
} from './dto';
import { RegisterRequestDto } from './dto/request/register.request.dto';
import { ApiBody, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Request } from 'express';

@Controller('')
@ApiTags('Auth cognito new')
export class AuthCognitoNewController {
  constructor(private readonly authService: AuthCognitoNewService) {}

  @Post('auth/register')
  @ApiBody({
    description: 'register payload',
    type: RegisterRequestDto,
  })
  async register(@Body() registerRequest: RegisterRequestDto) {
    try {
      return await this.authService.register(registerRequest);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Post('auth/verify-code')
  @ApiBody({
    description: 'verifyCode payload',
    type: VerifyEmailRegisterRequestDto,
  })
  async verifyCode(@Body() verifyRequest: VerifyEmailRegisterRequestDto) {
    try {
      return await this.authService.verifyRegister(verifyRequest);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Post('auth/login')
  @ApiBody({
    description: 'authenticate payload',
    type: AuthenticateRequestDto,
  })
  async login(@Body() authenticateRequest: AuthenticateRequestDto) {
    try {
      return await this.authService.login(authenticateRequest);
    } catch (e) {
      throw new BadRequestException(e?.message);
    }
  }

  @Post('auth/loginMFA')
  @ApiBody({
    description: 'authenticate payload',
    type: AuthenticateMFARequestDto,
  })
  async loginMfa(@Body() authenticateMFARequestDto: AuthenticateMFARequestDto) {
    try {
      return await this.authService.loginMfa(authenticateMFARequestDto);
    } catch (e) {
      throw new BadRequestException(e?.message);
    }
  }

  @Post('mfa/associateSoftwareToken')
  async associateSoftwareToken(
    @Req() request: Request,
    @Body() associateSoftwareTokenRequest: AssociateSoftwareTokenRequestDto,
  ) {
    try {
      var cogAccessToken = request['cog_accessToken'];
      return await this.authService.associateSoftwareToken(
        cogAccessToken,
        associateSoftwareTokenRequest.Session,
      );
    } catch (e) {
      throw new BadRequestException(e?.message);
    }
  }

  @Post('mfa/enableMFA')
  @ApiBody({
    description: 'authenticate payload',
    type: EnableMFAUser,
  })
  async enableMFAUser(
    @Req() request: Request,
    @Body() enableMFAUser: EnableMFAUser,
  ) {
    try {
      var cogAccessToken = request['cog_accessToken'];
      return await this.authService.enableMFAUser(
        cogAccessToken,
        enableMFAUser.nickname,
        enableMFAUser.sessionCode,
        enableMFAUser,
      );
    } catch (e) {
      throw new BadRequestException(e?.message);
    }
  }

  @Post('mfa/disableMFA')
  @ApiBody({
    description: 'authenticate payload',
    type: DisableMFAUser,
  })
  async disableMFAUser(
    @Req() request: Request,
    @Body() disableMFAUser: DisableMFAUser,
  ) {
    try {
      var cogAccessToken = request['cog_accessToken'];
      var userName = request['user']?.nickname;
      return await this.authService.disableMFAUser(
        userName,
        cogAccessToken,
        disableMFAUser,
      );
    } catch (e) {
      throw new BadRequestException(e?.message);
    }
  }

  @Post('mfa/adminDisableMFA')
  @ApiBody({
    description: 'authenticate payload',
    type: DisableMFAUser,
  })
  async adminDisableMFAUser(
    @Req() request: Request,
    @Body() disableMFAUser: DisableMFAUser,
  ) {
    try {
      return await this.authService.adminDisableMFAUser(
        disableMFAUser.userName,
      );
    } catch (e) {
      throw new BadRequestException(e?.message);
    }
  }

  //only uncomment for testing
  // @Post('auth/deleteUser')
  // @ApiBody({
  //   description: 'deleteUser payload',
  // })
  // async deleteUser(@Body() deleteUser: any) {
  //   try {
  //     return await this.authService.deleteUserCognito(deleteUser?.username);
  //   } catch (e) {
  //     throw new BadRequestException(e.message);
  //   }
  // }
}
