import { D_RE } from './D_RE.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { D_RERepository } from './D_RE.repository';
import { BaseService } from '../../../../utils/base.service';

@Injectable()
export class D_REService extends BaseService<D_RE> {
  constructor(
    @InjectRepository(D_RE)
    private readonly D_rERepository: D_RERepository,
  ) {
    super(D_rERepository);
  }
}
