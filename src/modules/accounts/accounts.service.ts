import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { getConnection } from 'typeorm';
import { OperationCodeEnum } from '../../enum';
import { ApiError } from '../../filter/api.error';
import { BaseService } from '../../utils/base.service';
import { AuthCognitoNewService } from '../auth-cognito/auth-cognito-new.service';
import { RegisterRequestDto } from '../auth-cognito/dto';
import { GroupLink } from '../group-link/group-link.entity';
import { LoggerService } from './../../logger/custom.logger';
import { Account } from './accounts.entity';
import { AccountRepository } from './accounts.repository';
import {
  AccountReponseDto,
  OperationAccountRequestDto,
  OperationAccountResponseDto,
} from './dto';
import { AccountQueryDto } from './dto/account.query.dto';
@Injectable()
export class AccountService extends BaseService<Account> {
  constructor(
    @InjectRepository(Account)
    public repository: AccountRepository,
    private logger: LoggerService,
    private authCognitoNewService: AuthCognitoNewService,
  ) {
    super(repository);
  }

  async find(query: AccountQueryDto): Promise<Account[]> {
    return this.repository.findAll(query);
  }

  async getUserByUsernameAndEmail(username: string, email: string) {
    const accountInfo = await this.repository.findOne({
      nickname: username,
      mail_address: email,
    });

    if (!accountInfo) {
      throw new ApiError(
        HttpStatus.BAD_REQUEST,
        'Account not found in database',
      );
    }
    return plainToClass(AccountReponseDto, accountInfo, {
      excludeExtraneousValues: true,
    });
  }

  async getByUsername(username: string) {
    const accountInfo = await this.repository.findOne({
      nickname: username,
    });
    if (!accountInfo) {
      throw new ApiError(
        HttpStatus.BAD_REQUEST,
        'Account not found in database',
      );
    }
    return accountInfo;
  }

  async getByAccountId(account_id: number) {
    return this.repository.findOne({
      account_id,
    });
  }

  async deleteAccontByAccountId(account_id: number) {
    const queryRunner = getConnection().createQueryRunner();
    await queryRunner.startTransaction();

    const currentUer = await this.repository.findOne({ account_id });
    if (!currentUer) {
      throw new ApiError(
        HttpStatus.BAD_REQUEST,
        'Account not found in database',
      );
    }

    try {
      await queryRunner.manager.delete(Account, { account_id });
      await queryRunner.manager.delete(GroupLink, { account_id });
      // Delete user from cognito
      await this.authCognitoNewService.deleteUserCognito(currentUer?.nickname);

      await queryRunner.commitTransaction();
    } catch (error) {
      this.logger.error(error?.message);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async updateAccount(operationAccountRequestDto: OperationAccountRequestDto) {
    const currentUer = await this.repository.findOne({
      account_id: operationAccountRequestDto.account_id,
    });

    if (!currentUer) {
      throw new ApiError(
        HttpStatus.BAD_REQUEST,
        'Account not found in database',
      );
    }
    return this.repository.update(
      { account_id: operationAccountRequestDto.account_id },
      operationAccountRequestDto,
    );
  }

  async createAccount(operationAccountRequestDto: OperationAccountRequestDto) {
    const currentUer = await this.repository.findOne({
      mail_address: operationAccountRequestDto.mail_address,
    });

    if (currentUer) {
      throw new ApiError(HttpStatus.BAD_REQUEST, 'Account is existed');
    }

    const queryRunner = getConnection().createQueryRunner();
    await queryRunner.startTransaction();

    try {
      let newAccount = new Account({
        ...operationAccountRequestDto,
        nickname: operationAccountRequestDto.given_name,
        address: '',
        record_creation_date: new Date(),
      });

      newAccount = await queryRunner.manager.save(Account, newAccount);
      // create user from cognito
      const registerRequestDto = new RegisterRequestDto();
      registerRequestDto.account_id = newAccount.account_id.toString();
      registerRequestDto.email = newAccount.mail_address;
      registerRequestDto.name = newAccount.nickname;
      registerRequestDto.password = '123456aA@';
      await this.authCognitoNewService.registerCognito(registerRequestDto);

      await queryRunner.commitTransaction();
      return newAccount;
    } catch (error) {
      this.logger.error(error?.message);
      await queryRunner.rollbackTransaction();
      throw new ApiError(HttpStatus.BAD_REQUEST, error?.message);
    } finally {
      await queryRunner.release();
    }
  }

  async operateAccount(operationAccountRequestDto: OperationAccountRequestDto) {
    let res: OperationAccountResponseDto;
    switch (operationAccountRequestDto.operation_code) {
      case OperationCodeEnum.ADD: {
        const createAccountRes = await this.createAccount(
          operationAccountRequestDto,
        );
        return createAccountRes;
      }
      case OperationCodeEnum.UPDATE: {
        delete operationAccountRequestDto.operation_code;
        return this.updateAccount(operationAccountRequestDto);
      }
      case OperationCodeEnum.DELETE: {
        await this.deleteAccontByAccountId(
          operationAccountRequestDto.account_id,
        );
        break;
      }
      default:
        throw new ApiError(HttpStatus.BAD_REQUEST, 'Operation is not support.');
    }
    return res;
  }

  async getAccountGroup(account_id: number) {
    return this.repository.getAccountGroup(account_id);
  }
}
