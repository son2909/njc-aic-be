import { AccountInfo } from './../../common/account-info';
import { AuthUser } from './../../decorators/auth.user.decorator';
import { GroupLinkService } from './group-link.service';
import { Controller, Delete, Param } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from '../../../src/decorators/roles.decorator';
import { Role } from '../../../src/enum';

@Controller('group-link')
@ApiTags('Group link')
@ApiBearerAuth()
@Roles([Role.ADMIN, Role.CHECKER])
export class GroupLinkController {
  constructor(private groupLinkService: GroupLinkService) {}

  @Delete('/:group_id/:account_id')
  deleteGroup(
    @AuthUser() authUser: AccountInfo,
    @Param('group_id') group_id: number,
    @Param('account_id') account_id: number,
  ) {
    return this.groupLinkService.deleteGroupLink(
      authUser,
      group_id,
      account_id,
    );
  }
}
