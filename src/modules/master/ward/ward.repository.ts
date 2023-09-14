import { EntityRepository, Repository } from 'typeorm';
import { Ward } from './ward.entity';

@EntityRepository(Ward)
export class WardRepository extends Repository<Ward> {}
