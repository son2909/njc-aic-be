import { EntityRepository, Repository } from 'typeorm';
import { AbolishedMedicalPracticeM } from './abolished-medical-practice.entity';

@EntityRepository(AbolishedMedicalPracticeM)
export class AbolishedMedicalPracticeMRepository extends Repository<AbolishedMedicalPracticeM> {}
