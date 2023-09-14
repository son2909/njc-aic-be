import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { AccountInfo } from '../../common/account-info';
import { PageOptionsDto } from '../../common/dto/pagination-options.dto';
import { AuthUser } from '../../decorators/auth.user.decorator';
import { Roles } from '../../decorators/roles.decorator';
import { Role } from '../../enum';
import { AnnouncementService } from './announcement.service';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';
import { UpdateAnnouncementDto } from './dto/update-announcement.dto';

@ApiTags('announcement')
@ApiBearerAuth()
@Controller('announcements')
export class AnnouncementController {
  constructor(private readonly announcementService: AnnouncementService) {}

  @Get('/me')
  async getMyAnnouncement(
    @Query() pageOptionsDto: PageOptionsDto,
    @AuthUser() authUser: AccountInfo,
  ) {
    return this.announcementService.getMyAnnouncement(pageOptionsDto, authUser);
  }

  @Roles([Role.ADMIN])
  @Get()
  async findAllAndPaging(@Query() pageOptionsDto: PageOptionsDto) {
    return this.announcementService.findAllAndPaging(pageOptionsDto);
  }

  @Roles([Role.ADMIN])
  @ApiBody({
    type: CreateAnnouncementDto,
  })
  @Post()
  async create(
    @Body() createRequest: CreateAnnouncementDto,
    @AuthUser() authUser: AccountInfo,
  ) {
    return this.announcementService.create(createRequest, authUser);
  }

  @Roles([Role.ADMIN])
  @ApiBody({
    type: UpdateAnnouncementDto,
  })
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateRequest: UpdateAnnouncementDto,
  ) {
    return this.announcementService.edit(id, updateRequest);
  }

  @Roles([Role.ADMIN])
  @Get(':id')
  async getById(@Param('id') id: number) {
    return this.announcementService.getById(id);
  }

  @Roles([Role.ADMIN])
  @Delete(':id')
  async deleteById(@Param('id') id: number) {
    return this.announcementService.deleteThrow(id, 'Announcement not exist');
  }
}
