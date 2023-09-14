import { EntityRepository, Repository } from 'typeorm';
import { D_GT } from './D_GT.entity';

@EntityRepository(D_GT)
export class D_GTRepository extends Repository<D_GT> {}
