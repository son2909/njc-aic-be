import { EntityRepository, Repository } from 'typeorm';
import { SJ } from './SJ.entity';

@EntityRepository(SJ)
export class SJRepository extends Repository<SJ> {}
