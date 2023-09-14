import { EntityRepository, Repository } from 'typeorm';
import { GO } from './GO.entity';

@EntityRepository(GO)
export class GORepository extends Repository<GO> {}
