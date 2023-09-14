import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'd_ho_t' })
export class D_HO extends BaseEntity {
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
  identification_information: string;

  @Column()
  insurer_number: string;

  @Column()
  symbol: string;

  @Column()
  number: string;

  @Column()
  actual_days_of_medical_treatment: number;

  @Column()
  total_score: number;

  @Column()
  spare: number;

  @Column()
  number_of_times: number;

  @Column()
  total_amount: number;

  @Column()
  reason: number;

  @Column()
  certificate_number: number;

  @Column()
  medical_insurance: number;

  @Column()
  exemption_category: number;

  @Column()
  reduction_rate: number;

  @Column()
  reduction_amount: number;

  @Column()
  burden_amount: number;

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
