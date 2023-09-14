import { EntityRepository, Repository } from 'typeorm';
import { D_HH } from './D_HH.entity';

@EntityRepository(D_HH)
export class D_HHRepository extends Repository<D_HH> {}
