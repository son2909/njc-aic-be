import { Module } from '@nestjs/common';
import { MedicalInstitutionController } from './medical-institution.controller';
import { MedicalInstitutionService } from './medical-institution.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicalInstitutionRepository } from './medical-institution.repository';

@Module({
  imports: [TypeOrmModule.forFeature([MedicalInstitutionRepository])],
  controllers: [MedicalInstitutionController],
  providers: [MedicalInstitutionService],
  exports: [MedicalInstitutionService],
})
export class MedicalInstitutionModule {}
