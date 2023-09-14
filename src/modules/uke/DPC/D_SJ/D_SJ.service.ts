import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { D_SJ } from './D_SJ.entity';
import { D_SJRepository } from './D_SJ.repository';
import { BaseService } from '../../../../utils/base.service';

@Injectable()
export class D_SJService extends BaseService<D_SJ> {
  constructor(
    @InjectRepository(D_SJ)
    private readonly D_SJRepository: D_SJRepository,
  ) {
    super(D_SJRepository);
  }
}
