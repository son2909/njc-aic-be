import { D_GR } from './D_GR.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { D_GRRepository } from './D_GR.repository';
import { BaseService } from '../../../../utils/base.service';

@Injectable()
export class D_GRService extends BaseService<D_GR> {
  constructor(
    @InjectRepository(D_GR)
    private readonly D_GRRepository: D_GRRepository,
  ) {
    super(D_GRRepository);
  }
}
