import { D_MF } from './D_MF.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { D_MFRepository } from './D_MF.repository';
import { BaseService } from '../../../../utils/base.service';

@Injectable()
export class D_MFService extends BaseService<D_MF> {
  constructor(
    @InjectRepository(D_MF)
    private readonly D_MFRepository: D_MFRepository,
  ) {
    super(D_MFRepository);
  }
}
