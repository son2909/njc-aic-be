import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { DeleteResult } from 'typeorm';
import { EntityId } from 'typeorm/repository/EntityId';
import { AccountInfo } from '../../common/account-info';
import { AuthUser } from '../../decorators/auth.user.decorator';
import { ApiError } from '../../filter/api.error';
import { Roles } from './../../decorators/roles.decorator';
import { Role } from './../../enum/role.enum';
import { Account } from './accounts.entity';
import { AccountService } from './accounts.service';
import {
  AccountReponseDto,
  OperationAccountRequestDto,
  UpdateAccountDto,
} from './dto';
import { AccountQueryDto } from './dto/account.query.dto';
@UseInterceptors(ClassSerializerInterceptor)
@Controller('account')
@ApiTags('account')
@ApiBearerAuth()
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get()
  @Roles([Role.ADMIN])
  async index(@Query() query: AccountQueryDto): Promise<Account[]> {
    return this.accountService.find(query);
  }

  @Get('/me')
  async myProfile(
    @AuthUser() authUser: AccountInfo,
  ): Promise<AccountReponseDto> {
    const user = await this.accountService.getByUsername(authUser.nickname);
    return plainToClass(AccountReponseDto, user, {
      excludeExtraneousValues: true,
    });
  }

  @Get('/:group_id')
  @Roles([Role.ADMIN])
  async show(@Param('group_id') group_id: number): Promise<Account> {
    const user = await this.accountService.getByAccountId(group_id);
    if (!user) {
      throw new ApiError(HttpStatus.BAD_REQUEST, 'user not found');
    }

    return user;
  }

  @Put('/:id')
  @Roles([Role.ADMIN])
  update(
    @Param('id') id: EntityId,
    @Body() userData: UpdateAccountDto,
  ): Promise<Account> {
    return this.accountService.update(id, userData);
  }

  @Delete('/:id')
  @Roles([Role.ADMIN])
  destroy(@Param('id') id: EntityId): Promise<DeleteResult> {
    return this.accountService.delete(id);
  }

  @Post('/operateAccount')
  @Roles([Role.ADMIN])
  @ApiBody({
    type: OperationAccountRequestDto,
  })
  async operateAccount(
    @Body() operationAccountRequestDto: OperationAccountRequestDto,
  ) {
    return this.accountService.operateAccount(operationAccountRequestDto);
  }
}
