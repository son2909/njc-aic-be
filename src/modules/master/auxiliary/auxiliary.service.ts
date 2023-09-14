import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '../../../utils/base.service';
import { AuxiliaryRepository } from './auxiliary.repository';
import { Auxiliary } from './entities/auxiliary.entity';

@Injectable()
export class AuxiliaryService extends BaseService<Auxiliary> {
  constructor(
    @InjectRepository(Auxiliary)
    private readonly auxiliaryRepository: AuxiliaryRepository,
  ) {
    super(auxiliaryRepository);
  }
}
