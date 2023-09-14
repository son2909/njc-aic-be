import { EntityRepository, Repository } from 'typeorm';
import { D_MF } from './D_MF.entity';

@EntityRepository(D_MF)
export class D_MFRepository extends Repository<D_MF> {}
