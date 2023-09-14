import { KO } from './KO.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '../../../utils/base.service';
import { KORepository } from './KO.repository';

@Injectable()
export class KOService extends BaseService<KO> {
  constructor(
    @InjectRepository(KO)
    private readonly kORepository: KORepository,
  ) {
    super(kORepository);
  }
}
