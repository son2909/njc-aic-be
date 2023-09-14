import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '../../../utils/base.service';
import { Inclusive } from './entities/inclusive.entity';
import { InclusiveRepository } from './inclusive.repository';

@Injectable()
export class InclusiveService extends BaseService<Inclusive> {
  constructor(
    @InjectRepository(Inclusive)
    private readonly inclusiveRepo: InclusiveRepository,
  ) {
    super(inclusiveRepo);
  }
}
