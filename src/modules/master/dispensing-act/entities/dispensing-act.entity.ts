import { Expose, Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, MaxLength } from 'class-validator';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'dispensing_act_m' })
export class DispensingAct extends BaseEntity {
  @Column()
  id: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  @Column()
  change_category: number;

  @IsOptional()
  @MaxLength(1)
  @Expose()
  @Column()
  master_identification: string;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  @Expose()
  @PrimaryColumn()
  dispensing_code: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  @Column()
  kanji_significant_digits: number;

  @IsOptional()
  @MaxLength(64)
  @Expose()
  @Column()
  kanji_name: string;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  @Column()
  number_of_significant_digits: number;

  @IsOptional()
  @MaxLength(20)
  @Expose()
  @Column()
  kana_name: string;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  @Column()
  symbol_code_for_receipt_display: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  @Column()
  receipt_display_order_number: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  @Column()
  score_identification: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  @Column()
  dispensing_quantity_calculation_flag: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  @Column()
  basic_score: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  @Column()
  step_value_calculation_identification: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  @Column()
  lower_limit: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  @Column()
  upper_limit: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  @Column()
  increment_value: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  @Column()
  increment_score: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  @Column()
  upper_and_lower_limit_error_handling: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  @Column()
  subtraction_act_classification: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  @Column()
  subtraction_target_act_category: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  @Column()
  dispensing_act_identification_division: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  @Column()
  comprehensive_identification_class: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  @Column()
  spare_1: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  @Column()
  spare_2: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  @Column()
  reserve_3: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  @Column()
  spare_4: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  @Column()
  spare_5: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  @Column()
  dispensing_act_type_1: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  @Column()
  dispensing_act_type_2: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  @Column()
  latter_stage_elderly_application_category: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  @Column()
  facility_standard_code_1: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  @Column()
  facility_standard_code_2: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  @Column()
  facility_standard_code_3: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  @Column()
  facility_standard_code_4: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  @Column()
  facility_standard_code_5: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  @Column()
  facility_standard_code_6: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  @Column()
  facility_standard_code_7: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  @Column()
  facility_standard_code_8: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  @Column()
  facility_standard_code_9: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  @Column()
  facility_standard_code_10: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  @Column()
  receipt_contradiction_category: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  @Column()
  prescription_contradiction_category: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  @Column()
  dispensing_conflict_classification: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  @Column()
  medicine: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  @Column()
  time_addition_division: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  @Column()
  dosage_form: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  @Column()
  maximum_number_of_times_1: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  @Column()
  upper_limit_count_error_processing_1: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  @Column()
  maximum_number_of_times_2: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  @Column()
  upper_limit_count_error_processing_2: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  @Column()
  code: number;

  @IsOptional()
  @MaxLength(1)
  @Expose()
  @Column()
  serial_number: string;

  @IsOptional()
  @MaxLength(2)
  @Expose()
  @Column()
  minimum_age: string;

  @IsOptional()
  @MaxLength(2)
  @Expose()
  @Column()
  upper_age_limit: string;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  @Column()
  pharmaceutical_management_fee_category: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  @Column()
  notification_identification_category_1: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  @Column()
  notification_identification_category_2: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  @Column()
  old_score_identification: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  @Column()
  old_score: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  @Column()
  date_of_change: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  @Column()
  abolition_date: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  @Column()
  sequence_number: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  @Column()
  table_number: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  @Column()
  related_number: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  @Column()
  transfer: number;

  @CreateDateColumn({
    default: () => 'CURRENT_TIMESTAMP',
    name: 'created_date',
  })
  created_date: Date;

  @UpdateDateColumn({
    name: 'update_date',
    default: () => 'CURRENT_TIMESTAMP',
  })
  update_date: Date;
}
