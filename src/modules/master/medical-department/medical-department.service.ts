import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In } from 'typeorm';
import { Order } from '../../../enum';
import { BaseService } from '../../../utils/base.service';
import { MedicalDepartment } from './medical-department.entity';
import { MedicalDepartmentRepository } from './medical-department.repository';

@Injectable()
export class MedicalDepartmentService extends BaseService<MedicalDepartment> {
  constructor(
    @InjectRepository(MedicalDepartment)
    private readonly medicalDepartmentRepository: MedicalDepartmentRepository,
  ) {
    super(medicalDepartmentRepository);
  }

  async findByContentIn(contents: string[]) {
    return this.medicalDepartmentRepository.find({
      where: {
        content: In(contents),
      },
    });
  }

  async getAllAndSort() {
    return this.medicalDepartmentRepository.find({
      order: {
        content: Order.ASC,
      },
    });
  }
}
