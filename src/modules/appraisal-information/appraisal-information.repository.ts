import { EntityRepository, Repository } from 'typeorm';
import { AppraisalInformation } from './entities/appraisal-information.entity';

@EntityRepository(AppraisalInformation)
export class AppraisalInformationRepository extends Repository<AppraisalInformation> {}
