import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '../../../utils/base.service';
import { ConflictRelatedRepository } from './conflict-related.repository';
import { ConflictRelated } from './entities/conflict-related.entity';

@Injectable()
export class ConflictRelatedService extends BaseService<ConflictRelated> {
  constructor(
    @InjectRepository(ConflictRelated)
    private readonly conflictRelatedRepo: ConflictRelatedRepository,
  ) {
    super(conflictRelatedRepo);
  }
}
