import { EntityRepository, Repository } from 'typeorm';
import { FacilityStandardMedical } from '../entities/facility-standard-medical.entity';

@EntityRepository(FacilityStandardMedical)
export class FacilityStandardMedicalRepository extends Repository<FacilityStandardMedical> {}
