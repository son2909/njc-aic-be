import { EntityRepository, Repository } from 'typeorm';
import { D_GR } from './D_GR.entity';

@EntityRepository(D_GR)
export class D_GRRepository extends Repository<D_GR> {}
