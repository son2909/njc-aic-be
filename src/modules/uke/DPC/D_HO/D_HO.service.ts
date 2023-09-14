import { D_HO } from './D_HO.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { D_HORepository } from './D_HO.repository';
import { BaseService } from '../../../../utils/base.service';

@Injectable()
export class D_HOService extends BaseService<D_HO> {
  constructor(
    @InjectRepository(D_HO)
    private readonly D_HORepository: D_HORepository,
  ) {
    super(D_HORepository);
  }
}
