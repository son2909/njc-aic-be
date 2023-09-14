import { PartialType } from '@nestjs/swagger';
import { CreateMedicalInstitutionDto } from './create-medical-institution.dto';

export class UpdateMedicalInstitutionDto extends PartialType(
  CreateMedicalInstitutionDto,
) {}
