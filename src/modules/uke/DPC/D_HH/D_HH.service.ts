import { D_HH } from './D_HH.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { D_HHRepository } from './D_HH.repository';
import { BaseService } from '../../../../utils/base.service';

@Injectable()
export class D_HHService extends BaseService<D_HH> {
  constructor(
    @InjectRepository(D_HH)
    private readonly D_HHRepository: D_HHRepository,
  ) {
    super(D_HHRepository);
  }
}
