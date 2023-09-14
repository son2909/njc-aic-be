import { EntityRepository, Repository } from 'typeorm';
import { ConflictRelated } from './entities/conflict-related.entity';

@EntityRepository(ConflictRelated)
export class ConflictRelatedRepository extends Repository<ConflictRelated> {}
