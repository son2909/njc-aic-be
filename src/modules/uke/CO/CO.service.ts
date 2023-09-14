import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '../../../utils/base.service';
import { CO } from './CO.entity';
import { CORepository } from './CO.repository';

@Injectable()
export class COService extends BaseService<CO> {
  constructor(
    @InjectRepository(CO)
    private readonly cORepository: CORepository,
  ) {
    super(cORepository);
  }
}
