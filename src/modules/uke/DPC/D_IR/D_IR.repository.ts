import { EntityRepository, Repository } from 'typeorm';
import { D_IR } from './D_IR.entity';

@EntityRepository(D_IR)
export class D_IRRepository extends Repository<D_IR> {}
