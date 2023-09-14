import { SY } from './SY.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '../../../utils/base.service';
import { SYRepository } from './SY.repository';

@Injectable()
export class SYService extends BaseService<SY> {
  constructor(
    @InjectRepository(SY)
    private readonly sYRepository: SYRepository,
  ) {
    super(sYRepository);
  }
}
