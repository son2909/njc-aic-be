import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AbolishedMedicalPracticeMRepository } from './abolished-medical-practice.repository';
import { AbolishedMedicalPracticeMService } from './abolished-medical-practice.service';

@Module({
  imports: [TypeOrmModule.forFeature([AbolishedMedicalPracticeMRepository])],
  providers: [AbolishedMedicalPracticeMService],
  exports: [AbolishedMedicalPracticeMService],
})
export class AbolishedMedicalPracticeMModule {}
