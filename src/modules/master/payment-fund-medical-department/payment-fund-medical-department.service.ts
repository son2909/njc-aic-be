import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '../../../utils/base.service';
import { PaymentFundMedicalDepartment } from './payment-fund-medical-department.entity';
import { PaymentFundMedicalDepartmentRepository } from './payment-fund-medical-department.repository';

@Injectable()
export class PaymentFundMedicalDepartmentService extends BaseService<PaymentFundMedicalDepartment> {
  constructor(
    @InjectRepository(PaymentFundMedicalDepartment)
    private readonly paymentFundmedicalDepartmentRepository: PaymentFundMedicalDepartmentRepository,
  ) {
    super(paymentFundmedicalDepartmentRepository);
  }
}
