import { EntityRepository, Repository } from 'typeorm';
import { IR } from './IR.entity';

@EntityRepository(IR)
export class IRRepository extends Repository<IR> {}
