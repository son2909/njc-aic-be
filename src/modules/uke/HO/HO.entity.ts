import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'ho_t' })
export class HO extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  mi_id: number;

  @Column()
  f_id: number;

  @Column()
  p_id: number;

  @Column()
  receipt_int: number;

  @Column()
  num1: string;

  @Column()
  record_identification_information: string;

  @Column()
  insurer_int: string;

  @Column()
  insurance_card_symbol: string;

  @Column()
  insurance_card_int: string;

  @Column()
  actual_days_of_medical_treatment: number;

  @Column()
  total_score: number;

  @Column()
  spare: number;

  @Column()
  int_of_treatments: number;

  @Column()
  total_amount_of_medical_treatment: number;

  @Column()
  professional_reasons: number;

  @Column()
  certificate_int: number;

  @Column()
  medical_insurance: number;

  @Column()
  exemption_category: number;

  @Column()
  reduction_rate: number;

  @Column()
  reduction_amount: number;

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
