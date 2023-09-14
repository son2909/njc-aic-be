import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateAppraisalConditionSettingDto {
  @ApiProperty()
  @IsNotEmpty()
  mi_id: number;

  @ApiProperty()
  @IsNotEmpty()
  start_month: Date;

  @ApiProperty()
  @IsNotEmpty()
  end_month: Date;

  @ApiProperty()
  @IsNotEmpty()
  clinical_department: string;

  @ApiProperty()
  @IsNotEmpty()
  doctor_name: string;

  @ApiProperty()
  @IsNotEmpty()
  examination_payment_agency: string;

  @ApiProperty()
  @IsNotEmpty()
  identification_info: string;

  @ApiProperty()
  @IsNotEmpty()
  clinical_identification: string;

  @ApiProperty()
  @IsNotEmpty()
  assessment_reason: string;

  @ApiProperty()
  @IsNotEmpty()
  computer_code: number;
}
