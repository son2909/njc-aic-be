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

@Entity({ name: 'd_re_t' })
export class D_RE extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  mi_id: number;

  @Column()
  f_id: number;

  @Column()
  p_id: number;

  @Column()
  num1: string;

  @Column()
  identification_information: string;

  @Column()
  receipt_number: number;

  @Column()
  receipt_type: string;

  @Column()
  date_of_medical_treatment: number;

  @Column()
  family_name: string;

  @Column()
  gender_classification: number;

  @Column()
  date_of_birth: number;

  @Column()
  benefit_ratio: number;

  @Column()
  date_of_hospitalization: number;

  @Column()
  ward_classification: string;

  @Column()
  burden_category: number;

  @Column()
  receipt_special_notes: string;

  @Column()
  spare_1: number;

  @Column()
  medical_record_number: string;

  @Column()
  discount_point_unit_price: number;

  @Column()
  spare_2: number;

  @Column()
  spare_3: number;

  @Column()
  spare_4: number;

  @Column()
  comprehensive_receipt_category: number;

  @Column()
  number_of_item_information: number;

  @Column()
  search_number: number;

  @Column()
  spare: number;

  @Column()
  billing_information: string;

  @Column()
  department_name: number;

  @Column()
  human_body_part: number;

  @Column()
  sex: number;

  @Column()
  treatment: number;

  @Column()
  specified_disease: number;

  @Column()
  kana_name: string;

  @Column()
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
