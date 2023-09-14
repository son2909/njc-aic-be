import { EntityRepository, Repository } from 'typeorm';
import { D_SK } from './D_SK.entity';

@EntityRepository(D_SK)
export class D_SKRepository extends Repository<D_SK> {}
