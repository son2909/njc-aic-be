import { EntityRepository, Repository } from 'typeorm';
import { CO } from './CO.entity';

@EntityRepository(CO)
export class CORepository extends Repository<CO> {}
