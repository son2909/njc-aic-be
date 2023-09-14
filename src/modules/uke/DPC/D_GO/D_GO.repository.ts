import { EntityRepository, Repository } from 'typeorm';
import { D_GO } from './D_GO.entity';

@EntityRepository(D_GO)
export class D_GORepository extends Repository<D_GO> {}
