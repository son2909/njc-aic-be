import { EntityRepository, Repository } from 'typeorm';
import { D_SN } from './D_SN.entity';

@EntityRepository(D_SN)
export class D_SNRepository extends Repository<D_SN> {}
