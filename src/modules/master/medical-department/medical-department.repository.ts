import { MedicalDepartment } from './medical-department.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(MedicalDepartment)
export class MedicalDepartmentRepository extends Repository<MedicalDepartment> {}
