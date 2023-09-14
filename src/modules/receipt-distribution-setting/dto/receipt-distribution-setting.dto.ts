import { Expose } from 'class-transformer';

export class ReceiptDistributionSettingDto {
  @Expose()
  setting_id: number;

  @Expose()
  p_id: number;

  @Expose()
  mi_id: number;

  @Expose()
  medical_and_dental: number;

  @Expose()
  inpatient_outpatient: number;

  @Expose()
  social_insurance_national_insurance: number;

  @Expose()
  date_of_medical_treatment: Date;

  @Expose()
  clinical_department: number;

  @Expose()
  clinical_department_name: string;

  @Expose()
  presence_or_absence_of_errors: number;

  @Expose()
  more_than_the_corresponding_score_flag: number;

  @Expose()
  flag_below_the_score: number;

  @Expose()
  score: string;

  @Expose()
  account_id: number;

  @Expose()
  account_username: string;

  @Expose()
  created_date: Date;

  @Expose()
  update_date: Date;
}
