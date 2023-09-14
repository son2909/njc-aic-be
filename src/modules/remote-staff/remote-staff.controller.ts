import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { AccountInfo } from '../../common/account-info';
import { AuthUser } from '../../decorators/auth.user.decorator';
import { Roles } from '../../decorators/roles.decorator';
import { Role } from '../../enum';
import { SearchRemoteStaffDto } from './dto/search-remote-staff.dto';
import { RemoteStaffService } from './remote-staff.service';

@ApiTags('Remote staff')
@ApiBearerAuth()
@Roles([Role.ADMIN])
@Controller('remote-staff')
export class RemoteStaffController {
  constructor(private readonly remoteStaffService: RemoteStaffService) {}

  @ApiBody({
    type: SearchRemoteStaffDto,
  })
  @Post('/search')
  getListGroups(
    @Body() search_request: SearchRemoteStaffDto,
    @AuthUser() authUser: AccountInfo,
  ) {
    return this.remoteStaffService.search(search_request, authUser);
  }
}
