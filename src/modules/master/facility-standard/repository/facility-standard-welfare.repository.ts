import { EntityRepository, Repository } from 'typeorm';
import { FacilityStandardWelfare } from '../entities/facility-standard-welfare.entity';

@EntityRepository(FacilityStandardWelfare)
export class FacilityStandardWelfareRepository extends Repository<FacilityStandardWelfare> {}
