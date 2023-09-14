import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentFundMedicalDepartmentRepository } from './payment-fund-medical-department.repository';
import { PaymentFundMedicalDepartmentService } from './payment-fund-medical-department.service';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentFundMedicalDepartmentRepository])],
  providers: [PaymentFundMedicalDepartmentService],
  exports: [PaymentFundMedicalDepartmentService],
})
export class PaymentFundMedicalDepartmentModule {}
