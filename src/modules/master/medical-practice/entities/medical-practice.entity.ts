import { Expose, Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'medical_practice_m' })
export class MedicalPractice extends BaseEntity {
  @Column()
  id: number;

  @Type(() => Number)
  @IsNumber()
  @Expose()
  @IsOptional()
  @Column()
  change_category: number;

  @MaxLength(1)
  @IsOptional()
  @Column()
  master_type: string;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  @PrimaryColumn()
  medical_practice_code: number;

  @Type(() => Number)
  @IsNumber()
  @Expose()
  @IsOptional()
  @Column()
  significant_digits_1: number;

  @MaxLength(64)
  @Expose()
  @IsOptional()
  @Column()
  abbreviated_kanji: string;

  @Type(() => Number)
  @IsNumber()
  @Expose()
  @IsOptional()
  @Column()
  significant_digits_2: number;

  @MaxLength(20)
  @Expose()
  @IsOptional()
  @Column()
  abbreviated_kana: string;

  @Type(() => String)
  @IsString()
  @Expose()
  @IsOptional()
  @Column()
  data_standard_code: string;

  @Type(() => Number)
  @IsNumber()
  @Expose()
  @IsOptional()
  @Column()
  significant_digits_3: number;

  @MaxLength(12)
  @Expose()
  @IsOptional()
  @Column()
  kanji_name_1: string;

  @Type(() => Number)
  @IsNumber()
  @Expose()
  @IsOptional()
  @Column()
  score_identification_1: number;

  @Type(() => Number)
  @IsNumber()
  @Expose()
  @IsOptional()
  @Column()
  new_current_number: number;

  @Type(() => Number)
  @IsNumber()
  @Expose()
  @IsOptional()
  @Column()
  domestic_external_application_category: number;

  @Type(() => Number)
  @IsNumber()
  @Expose()
  @IsOptional()
  @Column()
  application_category: number;

  @Type(() => Number)
  @IsNumber()
  @Expose()
  @IsOptional()
  @Column()
  out_of_hospital: number;

  @Type(() => Number)
  @IsNumber()
  @Expose()
  @IsOptional()
  @Column()
  comprehensive_inspection: number;

  @Type(() => Number)
  @IsNumber()
  @Expose()
  @IsOptional()
  @Column()
  spare: number;

  @Type(() => Number)
  @IsNumber()
  @Expose()
  @IsOptional()
  @Column()
  dpc_application_category: number;

  @Type(() => Number)
  @IsNumber()
  @Expose()
  @IsOptional()
  @Column()
  hospital_classification: number;

  @Type(() => Number)
  @IsNumber()
  @Expose()
  @IsOptional()
  @Column()
  addition_1: number;

  @Type(() => Number)
  @IsNumber()
  @Expose()
  @IsOptional()
  @Column()
  target_category_1: number;

  @Type(() => Number)
  @IsNumber()
  @Expose()
  @IsOptional()
  @Column()
  addition_2: number;

  @Type(() => Number)
  @IsNumber()
  @Expose()
  @IsOptional()
  @Column()
  anesthesia_identification: number;

  @Type(() => Number)
  @IsNumber()
  @Expose()
  @IsOptional()
  @Column()
  addition_division_1: number;

  @Type(() => Number)
  @IsNumber()
  @Expose()
  @IsOptional()
  @Column()
  injury_name_related_category: number;

  @Type(() => Number)
  @IsNumber()
  @Expose()
  @IsOptional()
  @Column()
  medical_management_fee: number;

  @Type(() => Number)
  @IsNumber()
  @Expose()
  @IsOptional()
  @Column()
  actual_number_of_days: number;

  @Type(() => Number)
  @IsNumber()
  @Expose()
  @IsOptional()
  @Column()
  number_of_days_number: number;

  @Type(() => Number)
  @IsNumber()
  @Expose()
  @IsOptional()
  @Column()
  pharmaceutical_category: number;

  @Type(() => Number)
  @IsNumber()
  @Expose()
  @IsOptional()
  @Column()
  increment_value_identification: number;

  @Type(() => Number)
  @IsNumber()
  @Expose()
  @IsOptional()
  @Column()
  lower_limit: number;

  @Type(() => Number)
  @IsNumber()
  @Expose()
  @IsOptional()
  @Column()
  upper_limit: number;

  @Type(() => Number)
  @IsNumber()
  @Expose()
  @IsOptional()
  @Column()
  increment_value: number;

  @Type(() => Number)
  @IsNumber()
  @Expose()
  @IsOptional()
  @Column()
  increment_score: number;

  @Type(() => Number)
  @IsNumber()
  @Expose()
  @IsOptional()
  @Column()
  upper_and_lower_limit_error_handling: number;

  @Type(() => Number)
  @IsNumber()
  @Expose()
  @IsOptional()
  @Column()
  maximum_number_of_times: number;

  @Type(() => Number)
  @IsNumber()
  @Expose()
  @IsOptional()
  @Column()
  upper_limit_error_handling: number;

  @Type(() => Number)
  @IsNumber()
  @Expose()
  @IsOptional()
  @Column()
  note_addition_code: number;

  @MaxLength(1)
  @Expose()
  @IsOptional()
  @Column()
  note_addition_serial_number: string;

  @Type(() => Number)
  @IsNumber()
  @Expose()
  @IsOptional()
  @Column()
  general_age: number;

  @MaxLength(2)
  @Expose()
  @IsOptional()
  @Column()
  minimum_age: string;

  @MaxLength(2)
  @Expose()
  @IsOptional()
  @Column()
  upper_age_limit: string;

  @Type(() => Number)
  @IsNumber()
  @Expose()
  @IsOptional()
  @Column()
  addition_division_2: number;

  @Type(() => Number)
  @IsNumber()
  @Expose()
  @IsOptional()
  @Column()
  conformity_division: number;

  @Type(() => Number)
  @IsNumber()
  @Expose()
  @IsOptional()
  @Column()
  target_facility_standard: number;

  @Type(() => Number)
  @IsNumber()
  @Expose()
  @IsOptional()
  @Column()
  addition_division_3: number;

  @Type(() => Number)
  @IsNumber()
  @Expose()
  @IsOptional()
  @Column()
  addition_division_4: number;

  @Type(() => Number)
  @IsNumber()
  @Expose()
  @IsOptional()
  @Column()
  object_identification: number;

  @Type(() => Number)
  @IsNumber()
  @Expose()
  @IsOptional()
  @Column()
  aggregation_classification_for_donors: number;

  @Type(() => Number)
  @IsNumber()
  @Expose()
  @IsOptional()
  @Column()
  inspection_division: number;

  @Type(() => Number)
  @IsNumber()
  @Expose()
  @IsOptional()
  @Column()
  inspection_implementation_group_classification: number;

  @Type(() => Number)
  @IsNumber()
  @Expose()
  @IsOptional()
  @Column()
  target_category_2: number;

  @Type(() => Number)
  @IsNumber()
  @Expose()
  @IsOptional()
  @Column()
  addition_division_5: number;

  @Type(() => Number)
  @IsNumber()
  @Expose()
  @IsOptional()
  @Column()
  addition_division_6: number;

  @Type(() => Number)
  @IsNumber()
  @Expose()
  @IsOptional()
  @Column()
  addition_division_7: number;

  @Type(() => Number)
  @IsNumber()
  @Expose()
  @IsOptional()
  @Column()
  addition_division_8: number;

  @Type(() => Number)
  @IsNumber()
  @Expose()
  @IsOptional()
  @Column()
  score_identification_2: number;

  @Type(() => Number)
  @IsNumber()
  @Expose()
  @IsOptional()
  @Column()
  old_score: number;

  @Type(() => Number)
  @IsNumber()
  @Expose()
  @IsOptional()
  @Column()
  kanji_name_change_category: number;

  @Type(() => Number)
  @IsNumber()
  @Expose()
  @IsOptional()
  @Column()
  kana_name_change_category: number;

  @Type(() => Number)
  @IsNumber()
  @Expose()
  @IsOptional()
  @Column()
  specimen_test_comment: number;

  @Type(() => Number)
  @IsNumber()
  @Expose()
  @IsOptional()
  @Column()
  target_category_3: number;

  @Type(() => Number)
  @IsNumber()
  @Expose()
  @IsOptional()
  @Column()
  comprehensive_declining_category: number;

  @Type(() => Number)
  @IsNumber()
  @Expose()
  @IsOptional()
  @Column()
  addition_division_9: number;

  @Type(() => Number)
  @IsNumber()
  @Expose()
  @IsOptional()
  @Column()
  spare_3: number;

  @Type(() => Number)
  @IsNumber()
  @Expose()
  @IsOptional()
  @Column()
  identification_hospitalization: number;

  @Type(() => Number)
  @IsNumber()
  @Expose()
  @IsOptional()
  @Column()
  addition_division_10: number;

  @Type(() => Number)
  @IsNumber()
  @Expose()
  @IsOptional()
  @Column()
  notice_identification_division_1: number;

  @Type(() => Number)
  @IsNumber()
  @Expose()
  @IsOptional()
  @Column()
  notice_identification_division_2: number;

  @Type(() => Number)
  @IsNumber()
  @Expose()
  @IsOptional()
  @Column()
  regional_addition: number;

  @Type(() => Number)
  @IsNumber()
  @Expose()
  @IsOptional()
  @Column()
  bed_number_classification: number;

  @Type(() => Number)
  @IsNumber()
  @Expose()
  @IsOptional()
  @Column()
  facility_standard_1: number;

  @Type(() => Number)
  @IsNumber()
  @Expose()
  @IsOptional()
  @Column()
  facility_standard_2: number;

  @Type(() => Number)
  @IsNumber()
  @Expose()
  @IsOptional()
  @Column()
  facility_standard_3: number;

  @Type(() => Number)
  @IsNumber()
  @Expose()
  @IsOptional()
  @Column()
  facility_standard_4: number;

  @Type(() => Number)
  @IsNumber()
  @Expose()
  @IsOptional()
  @Column()
  facility_standard_5: number;

  @Type(() => Number)
  @IsNumber()
  @Expose()
  @IsOptional()
  @Column()
  facility_standard_6: number;

  @Type(() => Number)
  @IsNumber()
  @Expose()
  @IsOptional()
  @Column()
  facility_standard_7: number;

  @Type(() => Number)
  @IsNumber()
  @Expose()
  @IsOptional()
  @Column()
  facility_standard_8: number;

  @Type(() => Number)
  @IsNumber()
  @Expose()
  @IsOptional()
  @Column()
  facility_standard_9: number;

  @Type(() => Number)
  @IsNumber()
  @Expose()
  @IsOptional()
  @Column()
  facility_standard_10: number;

  @Type(() => Number)
  @IsNumber()
  @Expose()
  @IsOptional()
  @Column()
  addition_section_11: number;

  @Type(() => Number)
  @IsNumber()
  @Expose()
  @IsOptional()
  @Column()
  stay_surgery: number;

  @Type(() => Number)
  @IsNumber()
  @Expose()
  @IsOptional()
  @Column()
  dental_division: number;

  @MaxLength(1)
  @Expose()
  @IsOptional()
  @Column()
  a_for_code_table: string;

  @MaxLength(1)
  @Expose()
  @IsOptional()
  @Column()
  notification_a: string;

  @Type(() => Number)
  @IsNumber()
  @Expose()
  @IsOptional()
  @Column()
  date_of_change: number;

  @Type(() => Number)
  @IsNumber()
  @Expose()
  @IsOptional()
  @Column()
  abolition_date: number;

  @Type(() => Number)
  @IsNumber()
  @Expose()
  @IsOptional()
  @Column()
  sequence_number: number;

  @Type(() => Number)
  @IsNumber()
  @Expose()
  @IsOptional()
  @Column()
  chapter_1: number;

  @Type(() => Number)
  @IsNumber()
  @Expose()
  @IsOptional()
  @Column()
  part_1: number;

  @Type(() => Number)
  @IsNumber()
  @Expose()
  @IsOptional()
  @Column()
  division_number_1: number;

  @Type(() => Number)
  @IsNumber()
  @Expose()
  @IsOptional()
  @Column()
  branch_number_1: number;

  @Type(() => Number)
  @IsNumber()
  @Expose()
  @IsOptional()
  @Column()
  item_number_1: number;

  @Type(() => Number)
  @IsNumber()
  @Expose()
  @IsOptional()
  @Column()
  chapter_2: number;

  @Type(() => Number)
  @IsNumber()
  @Expose()
  @IsOptional()
  @Column()
  part_2: number;

  @Type(() => Number)
  @IsNumber()
  @Expose()
  @IsOptional()
  @Column()
  division_number_2: number;

  @Type(() => Number)
  @IsNumber()
  @Expose()
  @IsOptional()
  @Column()
  branch_number_2: number;

  @Type(() => Number)
  @IsNumber()
  @Expose()
  @IsOptional()
  @Column()
  item_no_2: number;

  @Type(() => Number)
  @IsNumber()
  @Expose()
  @IsOptional()
  @Column()
  minimum_age_1: number;

  @MaxLength(2)
  @Expose()
  @IsOptional()
  @Column()
  maximum_age_1: string;

  @Type(() => Number)
  @IsNumber()
  @Expose()
  @IsOptional()
  @Column()
  medical_practice_code_1: number;

  @MaxLength(2)
  @Expose()
  @IsOptional()
  @Column()
  minimum_age_2: string;

  @MaxLength(2)
  @Expose()
  @IsOptional()
  @Column()
  maximum_age_2: string;

  @Type(() => Number)
  @IsNumber()
  @Expose()
  @IsOptional()
  @Column()
  medical_practice_code_2: number;

  @MaxLength(2)
  @Expose()
  @IsOptional()
  @Column()
  minimum_age_3: string;

  @MaxLength(2)
  @Expose()
  @IsOptional()
  @Column()
  maximum_age_3: string;

  @Type(() => Number)
  @IsNumber()
  @Expose()
  @IsOptional()
  @Column()
  medical_practice_code_3: number;

  @MaxLength(2)
  @Expose()
  @IsOptional()
  @Column()
  minimum_age_4: string;

  @MaxLength(2)
  @Expose()
  @IsOptional()
  @Column()
  maximum_age_4: string;

  @Type(() => Number)
  @IsNumber()
  @Expose()
  @IsOptional()
  @Column()
  medical_practice_code_4: number;

  @Type(() => Number)
  @IsNumber()
  @Expose()
  @IsOptional()
  @Column()
  transfer: number;

  @MaxLength(128)
  @Expose()
  @IsOptional()
  @Column()
  kanji_name_2: string;

  @MaxLength(1)
  @Expose()
  @IsOptional()
  @Column()
  addition_3: string;

  @MaxLength(1)
  @Expose()
  @IsOptional()
  @Column()
  addition_4: string;

  @MaxLength(1)
  @Expose()
  @IsOptional()
  @Column()
  addition_5: string;

  @MaxLength(30)
  @Expose()
  @IsOptional()
  @Column()
  division_number_3: string;

  @MaxLength(1)
  @Expose()
  @IsOptional()
  @Column()
  monitoring: string;

  @MaxLength(1)
  @Expose()
  @IsOptional()
  @Column()
  addition_6: string;

  @Type(() => Number)
  @IsNumber()
  @Expose()
  @IsOptional()
  @Column()
  spare_1: number;

  @Type(() => Number)
  @IsNumber()
  @Expose()
  @IsOptional()
  @Column()
  spare_2: number;

  @Type(() => Number)
  @IsNumber()
  @Expose()
  @IsOptional()
  @Column()
  reserve_3: number;

  @CreateDateColumn({
    default: () => 'CURRENT_TIMESTAMP',
    name: 'created_date',
    type: 'timestamp',
  })
  created_date: Date;

  @UpdateDateColumn({
    name: 'update_date',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  update_date: Date;
}
