import { EntityRepository, Repository } from 'typeorm';
import { D_TO } from './D_TO.entity';

@EntityRepository(D_TO)
export class D_TORepository extends Repository<D_TO> {}
