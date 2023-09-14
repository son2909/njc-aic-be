import { EntityRepository, Repository } from 'typeorm';
import { D_JD } from './D_JD.entity';

@EntityRepository(D_JD)
export class D_JDRepository extends Repository<D_JD> {}
