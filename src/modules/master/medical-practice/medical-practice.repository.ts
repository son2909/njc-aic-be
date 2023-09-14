import { EntityRepository, Repository } from 'typeorm';
import { MedicalPractice } from './entities/medical-practice.entity';

@EntityRepository(MedicalPractice)
export class MedicalPracticeRepository extends Repository<MedicalPractice> {}
