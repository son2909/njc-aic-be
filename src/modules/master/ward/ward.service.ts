import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '../../../utils/base.service';
import { Ward } from './ward.entity';
import { WardRepository } from './ward.repository';

@Injectable()
export class WardService extends BaseService<Ward> {
  constructor(
    @InjectRepository(Ward)
    private readonly wardRepository: WardRepository,
  ) {
    super(wardRepository);
  }
}
