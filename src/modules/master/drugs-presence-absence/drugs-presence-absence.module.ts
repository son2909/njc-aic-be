import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DrugsPresenceAbsenceRepository } from './drugs-presence-absence.repository';
import { DrugsPresenceAbsenceService } from './drugs-presence-absence.service';

@Module({
  imports: [TypeOrmModule.forFeature([DrugsPresenceAbsenceRepository])],
  providers: [DrugsPresenceAbsenceService],
  exports: [DrugsPresenceAbsenceService],
})
export class DrugsPresenceAbsenceModule {}
