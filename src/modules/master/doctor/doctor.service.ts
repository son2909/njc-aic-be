import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/enum';
import { BaseService } from '../../../utils/base.service';
import { DoctorRepository } from './doctor.repository';
import { Doctor } from './entities/doctor.entity';

@Injectable()
export class DoctorService extends BaseService<Doctor> {
  constructor(
    @InjectRepository(Doctor)
    private readonly doctorRepo: DoctorRepository,
  ) {
    super(doctorRepo);
  }

  async getAllAndSort() {
    return this.doctorRepo.find({
      order: {
        doctor_name: Order.ASC,
      },
    });
  }
}
