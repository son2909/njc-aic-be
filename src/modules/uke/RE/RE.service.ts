import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '../../../utils/base.service';
import { RE } from './RE.entity';
import { RERepository } from './RE.repository';

@Injectable()
export class REService extends BaseService<RE> {
  constructor(
    @InjectRepository(RE)
    private readonly rERepository: RERepository,
  ) {
    super(rERepository);
  }

  async findByDateOfMedicalTreatment(
    mi_id: number,
    // p_id: number,
    dateOfMedicalTreatment: number,
  ) {
    return this.rERepository.findOne({
      where: {
        date_of_medical_treatment: dateOfMedicalTreatment,
        mi_id: mi_id,
      },
    });
  }

  async findAllPatient() {
    return this.rERepository
      .createQueryBuilder('re')
      .select('DISTINCT re.p_id p_id, re.name p_name')
      .where('re.p_id IS NOT NULL')
      .orderBy('re.p_id')
      .getRawMany();
  }
}
