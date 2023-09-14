import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'ko_t' })
export class KO extends BaseEntity {
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
  bearer_number: string;

  @Column()
  beneficiary_number: number;

  @Column()
  benefit_category: number;

  @Column()
  actual_days: number;

  @Column()
  total_score: number;

  @Column()
  burden_amount: number;

  @Column()
  outpatient_copayment: number;

  @Column()
  hospital_copayment: number;

  @Column()
  spare: number;

  @Column()
  number_treatments: number;

  @Column()
  total_amount_of_medical_treatment: number;

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
