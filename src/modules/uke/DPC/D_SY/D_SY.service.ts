import { D_SY } from './D_SY.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { D_SYRepository } from './D_SY.repository';
import { BaseService } from '../../../../utils/base.service';

@Injectable()
export class D_SYService extends BaseService<D_SY> {
  constructor(
    @InjectRepository(D_SY)
    private readonly D_SYRepository: D_SYRepository,
  ) {
    super(D_SYRepository);
  }
}
