import { D_GT } from './D_GT.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { D_GTRepository } from './D_GT.repository';
import { BaseService } from '../../../../utils/base.service';

@Injectable()
export class D_GTService extends BaseService<D_GT> {
  constructor(
    @InjectRepository(D_GT)
    private readonly D_GTRepository: D_GTRepository,
  ) {
    super(D_GTRepository);
  }
}
