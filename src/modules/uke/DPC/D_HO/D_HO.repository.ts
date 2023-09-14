import { EntityRepository, Repository } from 'typeorm';
import { D_HO } from './D_HO.entity';

@EntityRepository(D_HO)
export class D_HORepository extends Repository<D_HO> {}
