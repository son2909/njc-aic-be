import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FacilityStandardMedicalService } from './facility-standard-medical.service';
import { FacilityStandardWelfareService } from './facility-standard-welfare.service';
import { FacilityStandardMedicalRepository } from './repository/facility-standard-medical.repository';
import { FacilityStandardWelfareRepository } from './repository/facility-standard-welfare.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FacilityStandardMedicalRepository,
      FacilityStandardWelfareRepository,
    ]),
  ],
  providers: [FacilityStandardMedicalService, FacilityStandardWelfareService],
  exports: [FacilityStandardMedicalService, FacilityStandardWelfareService],
})
export class FacilityStandardModule {}
