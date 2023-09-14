import { EntityRepository, Repository } from 'typeorm';
import { Auxiliary } from './entities/auxiliary.entity';

@EntityRepository(Auxiliary)
export class AuxiliaryRepository extends Repository<Auxiliary> {}
