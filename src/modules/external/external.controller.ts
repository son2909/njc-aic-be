import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PageOptionsDto } from '../../common/dto/pagination-options.dto';
import { ExternalService } from './external.service';

@ApiTags('Api external')
@Controller('external')
export class ExternalController {
  constructor(private readonly externalService: ExternalService) {}

  @Get('/announcements')
  findAllAndPaging(@Query() pageOptionsDto: PageOptionsDto) {
    return this.externalService.getAnnouncementLogin(pageOptionsDto);
  }
}
