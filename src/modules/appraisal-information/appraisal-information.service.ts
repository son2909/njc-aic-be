import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '../../utils/base.service';
import { AppraisalInformationRepository } from './appraisal-information.repository';
import { AppraisalInformation } from './entities/appraisal-information.entity';

@Injectable()
export class AppraisalInformationService extends BaseService<AppraisalInformation> {
  constructor(
    @InjectRepository(AppraisalInformation)
    private appraisalInformationRepo: AppraisalInformationRepository,
  ) {
    super(appraisalInformationRepo);
  }

  getAllReason() {
    return this.appraisalInformationRepo
      .createQueryBuilder('ai')
      .select('DISTINCT (ai.reason)')
      .where('ai.reason IS NOT NULL')
      .orderBy('ai.reason')
      .getRawMany();
  }
}
