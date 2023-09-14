import { Expose } from 'class-transformer';

export class AppraisalConditionSettingDto {
  @Expose()
  setting_id: number;

  @Expose()
  mi_id: number;

  @Expose()
  medical_institution_name: string;

  @Expose()
  start_month: Date;

  @Expose()
  end_month: Date;

  @Expose()
  clinical_department: string;

  @Expose()
  medical_department_name: string;

  @Expose()
  doctor_name: string;

  @Expose()
  examination_payment_agency: string;

  @Expose()
  identification_info: string;

  @Expose()
  clinical_identification: string;

  @Expose()
  assessment_reason: string;

  @Expose()
  computer_code: number;
}
