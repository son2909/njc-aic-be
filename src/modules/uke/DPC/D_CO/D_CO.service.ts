import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { D_CO } from './D_CO.entity';
import { D_CORepository } from './D_CO.repository';
import { BaseService } from '../../../../utils/base.service';

@Injectable()
export class D_COService extends BaseService<D_CO> {
  constructor(
    @InjectRepository(D_CO)
    private readonly D_CORepository: D_CORepository,
  ) {
    super(D_CORepository);
  }
}
