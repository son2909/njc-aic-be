import { EntityRepository, Repository } from 'typeorm';
import { GR } from './GR.entity';

@EntityRepository(GR)
export class GRRepository extends Repository<GR> {}
