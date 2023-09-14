import { EntityRepository, Repository } from 'typeorm';
import { SY } from './SY.entity';

@EntityRepository(SY)
export class SYRepository extends Repository<SY> {}
