import { EntityRepository, Repository } from 'typeorm';
import { D_IY } from './D_IY.entity';

@EntityRepository(D_IY)
export class D_IYRepository extends Repository<D_IY> {}
