import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '../../../utils/base.service';
import { HighRiskDrug } from './entities/high-risk-drug.entity';
import { HighRiskDrugRepository } from './high-risk-drug.repository';

@Injectable()
export class HighRiskDrugService extends BaseService<HighRiskDrug> {
  constructor(
    @InjectRepository(HighRiskDrug)
    private readonly highRiskDrugRepo: HighRiskDrugRepository,
  ) {
    super(highRiskDrugRepo);
  }

  async save(entities: HighRiskDrug[]) {
    return this.bulkInsert(entities);
  }
}
