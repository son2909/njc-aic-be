import { D_SN } from './D_SN.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { D_SNRepository } from './D_SN.repository';
import { BaseService } from '../../../../utils/base.service';

@Injectable()
export class D_SNService extends BaseService<D_SN> {
  constructor(
    @InjectRepository(D_SN)
    private readonly D_SNRepository: D_SNRepository,
  ) {
    super(D_SNRepository);
  }
}
