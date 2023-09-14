import { EntityRepository, Repository } from 'typeorm';
import { PharmaceuticalM } from './pharmaceutical.entity';

@EntityRepository(PharmaceuticalM)
export class PharmaceuticalMRepository extends Repository<PharmaceuticalM> {}
