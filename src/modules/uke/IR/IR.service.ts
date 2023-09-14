import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '../../../utils/base.service';
import { IR } from './IR.entity';
import { IRRepository } from './IR.repository';

@Injectable()
export class IRService extends BaseService<IR> {
  constructor(
    @InjectRepository(IR)
    private readonly iRRepository: IRRepository,
  ) {
    super(iRRepository);
  }
}
