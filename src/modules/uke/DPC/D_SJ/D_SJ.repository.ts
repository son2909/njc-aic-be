import { EntityRepository, Repository } from 'typeorm';
import { D_SJ } from './D_SJ.entity';

@EntityRepository(D_SJ)
export class D_SJRepository extends Repository<D_SJ> {}
