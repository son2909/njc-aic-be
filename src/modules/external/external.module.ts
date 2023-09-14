import { Module } from '@nestjs/common';
import { AnnouncementModule } from '../announcement/announcement.module';
import { ExternalController } from './external.controller';
import { ExternalService } from './external.service';

@Module({
  imports: [AnnouncementModule],
  controllers: [ExternalController],
  providers: [ExternalService],
})
export class ExternalModule {}
