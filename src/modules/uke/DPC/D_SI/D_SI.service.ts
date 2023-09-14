import { D_SI } from './D_SI.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { D_SIRepository } from './D_SI.repository';
import { BaseService } from '../../../../utils/base.service';

@Injectable()
export class D_SIService extends BaseService<D_SI> {
  constructor(
    @InjectRepository(D_SI)
    private readonly d_SIRepository: D_SIRepository,
  ) {
    super(d_SIRepository);
  }
}
