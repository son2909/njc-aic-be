import { EntityRepository, Repository } from 'typeorm';
import { D_CD } from './D_CD.entity';

@EntityRepository(D_CD)
export class D_CDRepository extends Repository<D_CD> {}
