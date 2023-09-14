import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HighRiskDrugRepository } from './high-risk-drug.repository';
import { HighRiskDrugService } from './high-risk-drug.service';

@Module({
  imports: [TypeOrmModule.forFeature([HighRiskDrugRepository])],
  providers: [HighRiskDrugService],
  exports: [HighRiskDrugService],
})
export class HighRiskDrugModule {}
