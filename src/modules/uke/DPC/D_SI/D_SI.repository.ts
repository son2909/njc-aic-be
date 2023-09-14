import { EntityRepository, Repository } from 'typeorm';
import { D_SI } from './D_SI.entity';

@EntityRepository(D_SI)
export class D_SIRepository extends Repository<D_SI> {}
