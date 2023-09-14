import { Type, Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import 'reflect-metadata';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 're_t' })
export class RE extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  @Expose()
  mi_id: number;

  @Column()
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  @Expose()
  f_id: number;

  @Column()
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  @Expose()
  p_id: number;

  @Column()
  @Type(() => String)
  @IsString()
  @IsNotEmpty()
  @Expose()
  num1: string;

  @Column()
  @Type(() => String)
  @IsString()
  @IsOptional()
  @Expose()
  iden: string;

  @Column()
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  receipt_int: number;

  @Column()
  receipt_type: string;

  @Column()
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  date_of_medical_treatment: number;

  @Column()
  @Type(() => String)
  @IsString()
  @IsOptional()
  @Expose()
  name: string;

  @Column()
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  gender_classification: number;

  @Column()
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  date_of_birth: number;

  @Column()
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  benefit_ratio: number;

  @Column()
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  date_of_hospitalization: number;

  @Column()
  @Type(() => String)
  @IsString()
  @IsOptional()
  @Expose()
  ward_classification: string;

  @Column()
  @Type(() => String)
  @IsString()
  @IsOptional()
  @Expose()
  standard_burden_category: number;

  @Column()
  @Type(() => String)
  @IsString()
  @IsOptional()
  @Expose()
  receiptsn: string;

  @Column()
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  int_of_beds: number;

  @Column()
  mrint: string;

  @Column()
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  dpprice: number;

  @Column()
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  spare1: number;

  @Column()
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  spare2: number;

  @Column()
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  spare3: number;

  @Column()
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  searchint: number;

  @Column()
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  spare4: number;

  @Column()
  @Type(() => String)
  @IsString()
  @IsOptional()
  @Expose()
  billinfo: string;

  @Column()
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  dname1: number;

  @Column()
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  human_body_parts_1: number;

  @Column()
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  gender_etc_1: number;

  @Column()
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  medical_procedure_1: number;

  @Column()
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  specified_disease_1: number;

  @Column()
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  department_name_2: number;

  @Column()
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  human_body_part_2: number;

  @Column()
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  gender_etc_2: number;

  @Column()
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  medical_procedure_2: number;

  @Column()
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  specified_disease_2: number;

  @Column()
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  department_name_3: number;

  @Column()
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  human_body_part_3: number;

  @Column()
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  gender_etc_3: number;

  @Column()
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  medical_procedure_3: number;

  @Column()
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  specified_disease_3: number;

  @Column()
  @Type(() => String)
  @IsString()
  @IsOptional()
  @Expose()
  kana_name: string;

  @Column()
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  patient_condition: number;

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

  static getPropertyKeys(): string[] {
    return Object.keys(this.prototype);
  }
}
