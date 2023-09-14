import { Expose, Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, MaxLength } from 'class-validator';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'appraisal_information_t' })
export class AppraisalInformation extends BaseEntity {
  @Column()
  id: number;

  // @Type(() => Number)
  // @IsNumber()
  // @IsNotEmpty()
  @Column()
  f_id: number;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  @Column()
  @Expose({ name: 'mi_id' })
  m_id: number;

  @Column()
  num_1: string;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Column()
  @Expose()
  clinical_identification: number;

  @IsNotEmpty()
  @Column()
  @Expose()
  date_of_medical_treatment: Date;

  @MaxLength(100)
  @IsOptional()
  @Column()
  @Expose()
  receipt_no: string;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Column()
  @Expose()
  receipt_number: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Column()
  @Expose()
  department_code: number;

  @MaxLength(100)
  @IsOptional()
  @Column()
  @Expose()
  review_committee: string;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Column()
  @Expose()
  item_type: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Column()
  @Expose()
  insurer_number: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Column()
  @Expose()
  elderly_municipal_number: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Column()
  @Expose()
  payer_number_1: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Column()
  @Expose()
  payer_number_2: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Column()
  @Expose()
  payer_number_3: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Column()
  @Expose()
  payer_number_4: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Column()
  @Expose()
  division: number;

  @MaxLength(100)
  @IsOptional()
  @Column()
  @Expose()
  burden_category: string;

  @MaxLength(100)
  @IsOptional()
  @Column()
  @Expose()
  reason_job: string;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Column()
  @Expose()
  exemption_category: number;

  @MaxLength(100)
  @IsOptional()
  @Column()
  @Expose()
  family_name: string;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  @PrimaryColumn()
  @Expose()
  medical_record_number: number;

  @MaxLength(100)
  @IsOptional()
  @Column()
  @Expose()
  point_1: string;

  @MaxLength(100)
  @IsOptional()
  @Column()
  @Expose()
  point_2: string;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Column()
  @Expose()
  legal_number: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Column()
  @Expose()
  score_increase_decrease: number;

  @MaxLength(100)
  @IsOptional()
  @Column()
  @Expose()
  reason: string;

  @MaxLength(100)
  @IsOptional()
  @Column()
  @Expose()
  load: string;

  @MaxLength(100)
  @IsNotEmpty()
  @Column()
  @Expose()
  billing_summary: string;

  @MaxLength(100)
  @IsOptional()
  @Column()
  @Expose()
  post_assessment_burden: string;

  @MaxLength(100)
  @IsNotEmpty()
  @Column()
  @Expose()
  post_assessment_content: string;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Column()
  @Expose()
  search_number: number;

  @MaxLength(100)
  @IsOptional()
  @Column()
  @Expose()
  billing_information: string;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Column()
  @Expose()
  doctor_id: number;

  @MaxLength(60)
  @IsOptional()
  @Column()
  @Expose()
  doctor_name: string;

  @MaxLength(60)
  @IsOptional()
  @Column()
  @Expose()
  ward: string;

  @IsOptional()
  @Column()
  @Expose()
  date_medical_treatment: Date;

  @MaxLength(60)
  @IsOptional()
  @Column()
  @Expose()
  sex: string;

  @MaxLength(60)
  @IsOptional()
  @Column()
  @Expose()
  date_of_birth: string;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Column()
  @Expose()
  insurance_benefit_ratio: number;

  @MaxLength(100)
  @IsOptional()
  @Column()
  @Expose()
  report: string;

  @MaxLength(60)
  @IsOptional()
  @Column()
  @Expose()
  insurance: string;

  @MaxLength(300)
  @IsOptional()
  @Column()
  @Expose()
  memo: string;

  @CreateDateColumn({
    default: () => 'CURRENT_TIMESTAMP',
    nullable: true,
    name: 'created_date',
  })
  created_date: Date;

  @UpdateDateColumn({
    name: 'update_date',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  update_date: Date;
}
