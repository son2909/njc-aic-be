import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { D_SK } from './D_SK.entity';
import { D_SKRepository } from './D_SK.repository';
import { BaseService } from '../../../../utils/base.service';

@Injectable()
export class D_SKService extends BaseService<D_SK> {
  constructor(
    @InjectRepository(D_SK)
    private readonly D_SKRepository: D_SKRepository,
  ) {
    super(D_SKRepository);
  }
}
