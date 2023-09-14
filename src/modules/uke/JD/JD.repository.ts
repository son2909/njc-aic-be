import { EntityRepository, Repository } from 'typeorm';
import { JD } from './JD.entity';

@EntityRepository(JD)
export class JDRepository extends Repository<JD> {}
