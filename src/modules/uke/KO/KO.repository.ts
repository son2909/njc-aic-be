import { EntityRepository, Repository } from 'typeorm';
import { KO } from './KO.entity';

@EntityRepository(KO)
export class KORepository extends Repository<KO> {}
