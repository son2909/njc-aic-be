import { EntityRepository, Repository } from 'typeorm';
import { D_RE } from './D_RE.entity';

@EntityRepository(D_RE)
export class D_RERepository extends Repository<D_RE> {}
