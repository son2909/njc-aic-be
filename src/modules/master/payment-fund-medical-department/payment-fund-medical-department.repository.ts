import { EntityRepository, Repository } from 'typeorm';
import { PaymentFundMedicalDepartment } from './payment-fund-medical-department.entity';

@EntityRepository(PaymentFundMedicalDepartment)
export class PaymentFundMedicalDepartmentRepository extends Repository<PaymentFundMedicalDepartment> {}
