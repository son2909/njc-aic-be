import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { D_GA } from './D_GA.entity';
import { D_GARepository } from './D_GA.repository';
import { BaseService } from '../../../../utils/base.service';

@Injectable()
export class D_GAService extends BaseService<D_GA> {
  constructor(
    @InjectRepository(D_GA)
    private readonly D_GARepository: D_GARepository,
  ) {
    super(D_GARepository);
  }
}
