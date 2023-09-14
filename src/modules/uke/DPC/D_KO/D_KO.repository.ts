import { EntityRepository, Repository } from 'typeorm';
import { D_KO } from './D_KO.entity';

@EntityRepository(D_KO)
export class D_KORepository extends Repository<D_KO> {}
