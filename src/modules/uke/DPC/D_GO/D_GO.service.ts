import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { D_GO } from './D_GO.entity';
import { D_GORepository } from './D_GO.repository';
import { BaseService } from '../../../../utils/base.service';

@Injectable()
export class D_GOService extends BaseService<D_GO> {
  constructor(
    @InjectRepository(D_GO)
    private readonly D_GORepository: D_GORepository,
  ) {
    super(D_GORepository);
  }
}
