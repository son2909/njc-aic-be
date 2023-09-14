import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '../../../utils/base.service';
import { SJ } from './SJ.entity';
import { SJRepository } from './SJ.repository';

@Injectable()
export class SJService extends BaseService<SJ> {
  constructor(
    @InjectRepository(SJ)
    private readonly sJRepository: SJRepository,
  ) {
    super(sJRepository);
  }
}
