import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AccountInfo } from '../../common/account-info';
import { AuthUser } from '../../decorators/auth.user.decorator';
import { AlertService } from './alert.service';

@ApiTags('alert')
@ApiBearerAuth()
@Controller('alert')
export class AlertController {
  constructor(private readonly alertService: AlertService) {}

  @Get('/me')
  async getMyAnnouncement(@AuthUser() authUser: AccountInfo) {
    return this.alertService.getFirstByAccount(authUser.account_id);
  }
}
