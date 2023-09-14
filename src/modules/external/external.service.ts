import { Injectable } from '@nestjs/common';
import { PageOptionsDto } from '../../common/dto/pagination-options.dto';
import { AnnouncementService } from '../announcement/announcement.service';

@Injectable()
export class ExternalService {
  constructor(private readonly announcementService: AnnouncementService) {}

  async getAnnouncementLogin(pageOptionsDto: PageOptionsDto) {
    return this.announcementService.getExternal(pageOptionsDto);
  }
}
