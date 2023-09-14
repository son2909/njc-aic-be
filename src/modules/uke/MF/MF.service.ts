import { MF } from './MF.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '../../../utils/base.service';
import { MFRepository } from './MF.repository';

@Injectable()
export class MFService extends BaseService<MF> {
  constructor(
    @InjectRepository(MF)
    private readonly mFRepository: MFRepository,
  ) {
    super(mFRepository);
  }
}
