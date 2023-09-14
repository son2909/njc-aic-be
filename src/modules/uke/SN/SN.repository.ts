import { EntityRepository, Repository } from 'typeorm';
import { SN } from './SN.entity';

@EntityRepository(SN)
export class SNRepository extends Repository<SN> {}
