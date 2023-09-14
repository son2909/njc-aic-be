import { EntityRepository, Repository } from 'typeorm';
import { HighRiskDrug } from './entities/high-risk-drug.entity';

@EntityRepository(HighRiskDrug)
export class HighRiskDrugRepository extends Repository<HighRiskDrug> {}
