import { SN } from './SN.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '../../../utils/base.service';
import { SNRepository } from './SN.repository';

@Injectable()
export class SNService extends BaseService<SN> {
  constructor(
    @InjectRepository(SN)
    private readonly sNRepository: SNRepository,
  ) {
    super(sNRepository);
  }
}
