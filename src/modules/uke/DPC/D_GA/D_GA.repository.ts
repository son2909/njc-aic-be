import { EntityRepository, Repository } from 'typeorm';
import { D_GA } from './D_GA.entity';

@EntityRepository(D_GA)
export class D_GARepository extends Repository<D_GA> {}
