import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsArray, IsNumber, IsOptional } from 'class-validator';

export class ReceiptInformationTblDto {
  @Expose()
  receipt_information_id: number;

  @Expose()
  status_check_flag: number;

  @Expose()
  mi_id: number;

  @Expose()
  medical_institution_name: string;

  @Expose()
  patient_id: number;

  @Expose()
  patient_name: string;

  @Expose()
  date_of_medical_treatment: Date;

  @Expose()
  medical_dental_flag: number;

  @Expose()
  inpatient_outpatient_flag: number;

  @Expose()
  social_national_flag: number;

  @Expose()
  clinical_department: number;

  @Expose()
  clinical_department_name: string;

  @Expose()
  total_score: number;

  @Expose()
  error_flag: string;

  @Expose()
  acknowledgment_flag: string;

  @Expose()
  note_contents: string;

  @Expose()
  account_id: number;

  @Expose()
  account_username: string;

  @Expose()
  receipt_type: number;
}

export class PartialUpdateReceiptDto {
  @ApiPropertyOptional()
  @IsOptional()
  doctor_name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  doctor_id?: number;

  @ApiPropertyOptional()
  @IsOptional()
  account_id?: number;

  @ApiPropertyOptional()
  @IsOptional()
  group_id?: number;

  @ApiPropertyOptional()
  @IsOptional()
  account_id2?: number;

  @ApiPropertyOptional()
  @IsOptional()
  invoice_id?: number;

  @ApiPropertyOptional()
  @IsOptional()
  clinical_department?: string;

  @ApiPropertyOptional()
  @IsOptional()
  total_score?: number;

  @ApiPropertyOptional()
  @IsOptional()
  medical_dpc_flag?: number;

  @ApiPropertyOptional()
  @IsOptional()
  medical_dental_flag?: number;

  @ApiPropertyOptional()
  @IsOptional()
  inpatient_outpatient_flag?: number;

  @ApiPropertyOptional()
  @IsOptional()
  social_national_flag?: number;

  @ApiPropertyOptional()
  @IsOptional()
  return_destination?: number;

  @ApiPropertyOptional()
  @IsOptional()
  error_flag?: number;

  @ApiPropertyOptional()
  @IsOptional()
  acknowledgment_flag?: number;

  @ApiPropertyOptional()
  @IsOptional()
  allocation_status_flag?: number;

  @ApiPropertyOptional()
  @IsOptional()
  status_check_flag?: number;

  @ApiPropertyOptional()
  @IsOptional()
  print_status_flag?: number;

  @ApiPropertyOptional()
  @IsOptional()
  delivery_status_flag?: number;

  @ApiPropertyOptional()
  @IsOptional()
  data_received_date?: Date;

  @ApiPropertyOptional()
  @IsOptional()
  billing_date?: Date;

  @ApiPropertyOptional()
  @IsOptional()
  date_of_medical_treatment?: Date;

  @ApiPropertyOptional()
  @IsOptional()
  deadline_for_inspection?: Date;

  @ApiPropertyOptional()
  @IsOptional()
  inspection_completion_date?: Date;

  @ApiPropertyOptional()
  @IsOptional()
  inspection_time?: number;

  @ApiPropertyOptional()
  @IsOptional()
  delivery_deadline?: Date;

  @ApiPropertyOptional()
  @IsOptional()
  delivery_completion_date?: Date;

  @ApiPropertyOptional()
  @IsOptional()
  assessment_flag?: number;

  @ApiPropertyOptional()
  @IsOptional()
  delayed_delivery_flag?: number;

  @ApiPropertyOptional()
  @IsOptional()
  inspection_incomplete_flag?: number;

  @ApiPropertyOptional()
  @IsOptional()
  note_contents?: string;

  @ApiPropertyOptional()
  @IsOptional()
  error1?: string;

  @ApiPropertyOptional()
  @IsOptional()
  error2?: string;

  @ApiPropertyOptional()
  @IsOptional()
  error3?: string;

  @ApiPropertyOptional()
  @IsOptional()
  error4?: string;

  @ApiPropertyOptional()
  @IsOptional()
  error5?: string;

  @ApiPropertyOptional()
  @IsOptional()
  error6?: string;

  @ApiPropertyOptional()
  @IsOptional()
  error7?: string;

  @ApiPropertyOptional()
  @IsOptional()
  error8?: string;

  @ApiPropertyOptional()
  @IsOptional()
  error9?: string;

  @ApiPropertyOptional()
  @IsOptional()
  error10?: string;

  @ApiPropertyOptional()
  @IsOptional()
  error11?: string;

  @ApiPropertyOptional()
  @IsOptional()
  error12?: string;

  @ApiPropertyOptional()
  @IsOptional()
  error13?: string;

  @ApiPropertyOptional()
  @IsOptional()
  error14?: string;

  @ApiPropertyOptional()
  @IsOptional()
  error15?: string;

  @ApiPropertyOptional()
  @IsOptional()
  error16?: string;

  @ApiPropertyOptional()
  @IsOptional()
  error17?: string;

  @ApiPropertyOptional()
  @IsOptional()
  error18?: string;

  @ApiPropertyOptional()
  @IsOptional()
  error19?: string;

  @ApiPropertyOptional()
  @IsOptional()
  error20?: string;
}

export class ReceiptInformationIdsDto {
  @IsArray()
  @ApiProperty()
  @IsNumber({}, { each: true })
  @Type(() => Number)
  receipt_information_ids: number[];
}
