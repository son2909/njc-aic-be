import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class MedicalInstitutionDto {
  @Expose()
  @ApiProperty()
  mi_id: number;

  @Expose()
  @ApiProperty()
  medical_institution_name: string;

  @Expose()
  @ApiProperty()
  officer_name: string;

  @Expose()
  @ApiProperty()
  created_date: string;
}
