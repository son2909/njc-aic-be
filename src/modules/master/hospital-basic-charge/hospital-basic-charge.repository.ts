import { EntityRepository, Repository } from 'typeorm';
import { HospitalBasicChargeT } from './hospital-basic-charge.entity';

@EntityRepository(HospitalBasicChargeT)
export class HospitalBasicChargeTRepository extends Repository<HospitalBasicChargeT> {}
