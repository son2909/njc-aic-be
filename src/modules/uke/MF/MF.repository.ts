import { EntityRepository, Repository } from 'typeorm';
import { MF } from './MF.entity';

@EntityRepository(MF)
export class MFRepository extends Repository<MF> {}
