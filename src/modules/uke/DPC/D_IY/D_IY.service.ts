import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { D_IY } from './D_IY.entity';
import { D_IYRepository } from './D_IY.repository';
import { BaseService } from '../../../../utils/base.service';

@Injectable()
export class D_IYService extends BaseService<D_IY> {
  constructor(
    @InjectRepository(D_IY)
    private readonly d_IYRepository: D_IYRepository,
  ) {
    super(d_IYRepository);
  }
}
