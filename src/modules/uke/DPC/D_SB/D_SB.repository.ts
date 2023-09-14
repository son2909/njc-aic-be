import { EntityRepository, Repository } from 'typeorm';
import { D_SB } from './D_SB.entity';

@EntityRepository(D_SB)
export class D_SBRepository extends Repository<D_SB> {}
