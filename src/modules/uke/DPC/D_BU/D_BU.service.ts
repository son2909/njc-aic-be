import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { D_BU } from './D_BU.entity';
import { D_BURepository } from './D_BU.repository';
import { BaseService } from '../../../../utils/base.service';

@Injectable()
export class D_BUService extends BaseService<D_BU> {
  constructor(
    @InjectRepository(D_BU)
    private readonly D_BURepository: D_BURepository,
  ) {
    super(D_BURepository);
  }
}
