import { GR } from './GR.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '../../../utils/base.service';
import { GRRepository } from './GR.repository';

@Injectable()
export class GRService extends BaseService<GR> {
  constructor(
    @InjectRepository(GR)
    private readonly gRRepository: GRRepository,
  ) {
    super(gRRepository);
  }
}
