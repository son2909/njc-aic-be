import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { D_SB } from './D_SB.entity';
import { D_SBRepository } from './D_SB.repository';
import { BaseService } from '../../../../utils/base.service';

@Injectable()
export class D_SBService extends BaseService<D_SB> {
  constructor(
    @InjectRepository(D_SB)
    private readonly D_SBRepository: D_SBRepository,
  ) {
    super(D_SBRepository);
  }
}
