import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicalPracticeRepository } from './medical-practice.repository';
import { MedicalPracticeService } from './medical-practice.service';

@Module({
  imports: [TypeOrmModule.forFeature([MedicalPracticeRepository])],
  providers: [MedicalPracticeService],
  exports: [MedicalPracticeService],
})
export class MedicalPracticeModule {}
