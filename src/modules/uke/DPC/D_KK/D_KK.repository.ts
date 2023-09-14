import { EntityRepository, Repository } from 'typeorm';
import { D_KK } from './D_KK.entity';

@EntityRepository(D_KK)
export class D_KKRepository extends Repository<D_KK> {}
