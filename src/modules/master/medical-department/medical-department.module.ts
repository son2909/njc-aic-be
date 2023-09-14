import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicalDepartmentRepository } from './medical-department.repository';
import { MedicalDepartmentService } from './medical-department.service';

@Module({
  imports: [TypeOrmModule.forFeature([MedicalDepartmentRepository])],
  providers: [MedicalDepartmentService],
  exports: [MedicalDepartmentService],
})
export class MedicalDepartmentModule {}
