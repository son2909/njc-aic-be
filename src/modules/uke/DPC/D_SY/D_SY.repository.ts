import { EntityRepository, Repository } from 'typeorm';
import { D_SY } from './D_SY.entity';

@EntityRepository(D_SY)
export class D_SYRepository extends Repository<D_SY> {}
