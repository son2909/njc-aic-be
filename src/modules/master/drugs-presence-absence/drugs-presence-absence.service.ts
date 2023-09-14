import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '../../../utils/base.service';
import { DrugsPresenceAbsenceRepository } from './drugs-presence-absence.repository';
import { DrugsPresenceAbsence } from './entities/drugs-presence-absence.entity';

@Injectable()
export class DrugsPresenceAbsenceService extends BaseService<DrugsPresenceAbsence> {
  constructor(
    @InjectRepository(DrugsPresenceAbsence)
    private drugsPresenceAbsenceRepository: DrugsPresenceAbsenceRepository,
  ) {
    super(drugsPresenceAbsenceRepository);
  }
}
