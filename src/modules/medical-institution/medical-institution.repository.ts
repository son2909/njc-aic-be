import { EntityRepository, Repository } from 'typeorm';
import { MedicalInstitution } from './entities/medical-institution.entity';

@EntityRepository(MedicalInstitution)
export class MedicalInstitutionRepository extends Repository<MedicalInstitution> {}
