import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountModule } from '../accounts/accounts.module';
import { AnnouncementController } from './announcement.controller';
import { AnnouncementRepository } from './announcement.repository';
import { AnnouncementService } from './announcement.service';

@Module({
  imports: [TypeOrmModule.forFeature([AnnouncementRepository]), AccountModule],
  controllers: [AnnouncementController],
  providers: [AnnouncementService],
  exports: [TypeOrmModule, AnnouncementService],
})
export class AnnouncementModule {}
