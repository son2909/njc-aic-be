import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { D_IR } from './D_IR.entity';
import { D_IRRepository } from './D_IR.repository';
import { BaseService } from '../../../../utils/base.service';

@Injectable()
export class D_IRService extends BaseService<D_IR> {
  constructor(
    @InjectRepository(D_IR)
    private readonly d_IRRepository: D_IRRepository,
  ) {
    super(d_IRRepository);
  }
}
