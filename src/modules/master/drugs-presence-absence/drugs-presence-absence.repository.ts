import { EntityRepository, Repository } from 'typeorm';
import { DrugsPresenceAbsence } from './entities/drugs-presence-absence.entity';

@EntityRepository(DrugsPresenceAbsence)
export class DrugsPresenceAbsenceRepository extends Repository<DrugsPresenceAbsence> {}
