import { EntityRepository, Repository } from 'typeorm';
import { HO } from './HO.entity';

@EntityRepository(HO)
export class HORepository extends Repository<HO> {}
