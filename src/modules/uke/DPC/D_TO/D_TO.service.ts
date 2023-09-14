import { D_TO } from './D_TO.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { D_TORepository } from './D_TO.repository';
import { BaseService } from '../../../../utils/base.service';

@Injectable()
export class D_TOService extends BaseService<D_TO> {
  constructor(
    @InjectRepository(D_TO)
    private readonly d_TORepository: D_TORepository,
  ) {
    super(d_TORepository);
  }
}
