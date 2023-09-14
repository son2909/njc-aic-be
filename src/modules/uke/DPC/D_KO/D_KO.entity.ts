import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'd_ko_t' })
export class D_KO extends BaseEntity {
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
  bearer_number: string;

  @Column()
  beneficiary_number: number;

  @Column()
  benefit_category: number;

  @Column()
  actual_days_of_medical_treatment: number;

  @Column()
  total_score: number;

  @Column()
  public_expense: number;

  @Column()
  spare_1: number;

  @Column()
  contribution: number;

  @Column()
  spare_2: number;

  @Column()
  number_of_times: number;

  @Column()
  total_amount: number;

  @Column()
  standard_burden_amount: number;

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
