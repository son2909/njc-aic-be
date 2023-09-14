import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { Roles } from '../../../src/decorators/roles.decorator';
import { Role } from '../../../src/enum';
import {
  AddMemberToGroupDto,
  GroupCreationDto,
  RenameGroupDto,
} from './dto/group-management.request.dto';
import { AccountInfo } from '../../../src/common/account-info';
import { AuthUser } from '../../../src/decorators/auth.user.decorator';
import { GroupManagementService } from './group-management.service';
import { AuthenticateRequestDto } from '../auth-cognito/dto';

@Controller('group-management')
@ApiTags('Group management')
@ApiBearerAuth()
// TODO: by pass role controller
// @Roles([Role.ADMIN, Role.CHECKER])
export class GroupManagementController {
  constructor(private groupManagementService: GroupManagementService) {}

  @Get()
  getListGroups(@AuthUser() authUser: AccountInfo) {
    return this.groupManagementService.getListGroups(authUser);
  }

  @Post()
  createGroup(
    @AuthUser() authUser: AccountInfo,
    @Body() groupPayload: GroupCreationDto,
  ) {
    return this.groupManagementService.createGroup(authUser, groupPayload);
  }

  @Get('get-group-by-user')
  getListGroupsByUser(@AuthUser() authUser: AccountInfo) {
    return this.groupManagementService.getListGroupsByUser(authUser);
  }

  @Post('add-member-to-group')
  addMemberToGroup(@Body() payload: AddMemberToGroupDto) {
    return this.groupManagementService.addMemberToGroup(payload);
  }

  @Put('rename-group/:group_id')
  renameGroup(
    @Param('group_id') group_id: number,
    @Body() payload: RenameGroupDto,
  ) {
    return this.groupManagementService.renameGroup(group_id, payload);
  }

  @Delete('/:group_id')
  deleteGroup(
    @Param('group_id') group_id: number,
    @AuthUser() authUser: AccountInfo,
  ) {
    return this.groupManagementService.deleteGroupByGroupId(group_id, authUser);
  }

  @Post('verify-password')
  @ApiBody({
    description: 'verify password',
    type: AuthenticateRequestDto,
  })
  async showUnitPrice(@Body() payload: AuthenticateRequestDto) {
    return this.groupManagementService.showUnitPriceByPassword(payload);
  }
}
