import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import {
  ErrorFlagEnum,
  InpatientOutpatientFlagEnum,
  MedicalDentalFlagEnum,
  SocialNationalFlagEnum,
} from '../../../modules/receipt-information/enum';

export class CreateReceiptDistributionSettingDto {
  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  p_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  mi_id: number;

  @ApiProperty()
  @IsOptional()
  @IsEnum(MedicalDentalFlagEnum)
  @Expose()
  medical_and_dental: MedicalDentalFlagEnum;

  @ApiProperty()
  @IsOptional()
  @IsEnum(InpatientOutpatientFlagEnum)
  @Expose()
  inpatient_outpatient: InpatientOutpatientFlagEnum;

  @ApiProperty()
  @IsOptional()
  @IsEnum(SocialNationalFlagEnum)
  @Expose()
  social_insurance_national_insurance: SocialNationalFlagEnum;

  @ApiProperty()
  @IsOptional()
  @Expose()
  date_of_medical_treatment: Date;

  @ApiProperty()
  @IsOptional()
  @Expose()
  clinical_department: number;

  @ApiProperty()
  @IsOptional()
  @IsEnum(ErrorFlagEnum)
  @Expose()
  presence_or_absence_of_errors: ErrorFlagEnum;

  @ApiProperty()
  @IsOptional()
  @Expose()
  more_than_the_corresponding_score_flag: number;

  @ApiProperty()
  @IsOptional()
  @Expose()
  flag_below_the_score: number;

  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  account_id: number;
}
