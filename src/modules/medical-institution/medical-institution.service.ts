import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Order } from '../../enum';
import { BaseService } from '../../utils/base.service';
import { MedicalInstitutionDto } from './dto/response/medical-institution.dto';
import { MedicalInstitution } from './entities/medical-institution.entity';
import { MedicalInstitutionRepository } from './medical-institution.repository';

@Injectable()
export class MedicalInstitutionService extends BaseService<MedicalInstitution> {
  constructor(
    @InjectRepository(MedicalInstitution)
    private medicalInstitutionRepo: MedicalInstitutionRepository,
  ) {
    super(medicalInstitutionRepo);
  }

  async findAllAndSort(): Promise<MedicalInstitutionDto[]> {
    const qb = this.medicalInstitutionRepo.createQueryBuilder('medical');
    qb.orderBy('medical.medical_institution_name', Order.ASC);
    const { entities } = await qb.getRawAndEntities();
    return entities.map((entity) =>
      plainToClass(MedicalInstitutionDto, entity, {
        excludeExtraneousValues: true,
      }),
    );
  }
}
