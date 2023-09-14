import { HO } from './HO.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '../../../utils/base.service';
import { HORepository } from './HO.repository';

@Injectable()
export class HOService extends BaseService<HO> {
  constructor(
    @InjectRepository(HO)
    private readonly hORepository: HORepository,
  ) {
    super(hORepository);
  }
}
