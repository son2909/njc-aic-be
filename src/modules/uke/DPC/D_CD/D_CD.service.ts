import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { D_CD } from './D_CD.entity';
import { D_CDRepository } from './D_CD.repository';
import { BaseService } from '../../../../utils/base.service';

@Injectable()
export class D_CDService extends BaseService<D_CD> {
  constructor(
    @InjectRepository(D_CD)
    private readonly D_CDRepository: D_CDRepository,
  ) {
    super(D_CDRepository);
  }
}
