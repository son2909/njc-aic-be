import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '../../../utils/base.service';
import { GO } from './GO.entity';
import { GORepository } from './GO.repository';

@Injectable()
export class GOService extends BaseService<GO> {
  constructor(
    @InjectRepository(GO)
    private readonly gORepository: GORepository,
  ) {
    super(gORepository);
  }
}
