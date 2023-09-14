import { EntityRepository, Repository } from 'typeorm';
import { D_BU } from './D_BU.entity';

@EntityRepository(D_BU)
export class D_BURepository extends Repository<D_BU> {}
