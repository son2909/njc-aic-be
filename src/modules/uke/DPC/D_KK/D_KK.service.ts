import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { D_KK } from './D_KK.entity';
import { D_KKRepository } from './D_KK.repository';
import { BaseService } from '../../../../utils/base.service';

@Injectable()
export class D_KKService extends BaseService<D_KK> {
  constructor(
    @InjectRepository(D_KK)
    private readonly D_KKRepository: D_KKRepository,
  ) {
    super(D_KKRepository);
  }
}
