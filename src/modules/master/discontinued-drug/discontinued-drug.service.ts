import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '../../../utils/base.service';
import { DiscontinuedDrugM } from './discontinued-drug.entity';
import { DiscontinuedDrugMRepository } from './discontinued-drug.repository';

@Injectable()
export class DiscontinuedDrugMService extends BaseService<DiscontinuedDrugM> {
  constructor(
    @InjectRepository(DiscontinuedDrugM)
    private readonly discontinuedDrugMRepository: DiscontinuedDrugMRepository,
  ) {
    super(discontinuedDrugMRepository);
  }
}
