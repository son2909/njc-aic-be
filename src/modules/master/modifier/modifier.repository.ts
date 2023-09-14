import { EntityRepository, Repository } from 'typeorm';
import { Modifier } from './entities/modifier.entity';

@EntityRepository(Modifier)
export class ModifierRepository extends Repository<Modifier> {}
