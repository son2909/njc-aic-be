import { AbolishedMedicalPracticeM } from './abolished-medical-practice.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '../../../utils/base.service';
import { AbolishedMedicalPracticeMRepository } from './abolished-medical-practice.repository';

@Injectable()
export class AbolishedMedicalPracticeMService extends BaseService<AbolishedMedicalPracticeM> {
  constructor(
    @InjectRepository(AbolishedMedicalPracticeM)
    private readonly abolishedMedicalPracticeMRepository: AbolishedMedicalPracticeMRepository,
  ) {
    super(abolishedMedicalPracticeMRepository);
  }
}
