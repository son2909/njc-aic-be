import { EntityRepository, Repository } from 'typeorm';
import { D_CO } from './D_CO.entity';

@EntityRepository(D_CO)
export class D_CORepository extends Repository<D_CO> {}
