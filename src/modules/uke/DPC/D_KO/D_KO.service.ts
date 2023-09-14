import { D_KO } from './D_KO.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { D_KORepository } from './D_KO.repository';
import { BaseService } from '../../../../utils/base.service';

@Injectable()
export class D_KOService extends BaseService<D_KO> {
  constructor(
    @InjectRepository(D_KO)
    private readonly D_KORepository: D_KORepository,
  ) {
    super(D_KORepository);
  }
}
