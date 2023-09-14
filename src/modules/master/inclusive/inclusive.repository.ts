import { EntityRepository, Repository } from 'typeorm';
import { Inclusive } from './entities/inclusive.entity';

@EntityRepository(Inclusive)
export class InclusiveRepository extends Repository<Inclusive> {}
