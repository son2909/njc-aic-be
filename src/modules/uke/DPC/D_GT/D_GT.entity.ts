import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'd_gt_t' })
export class D_GT extends BaseEntity {
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
  num2: string;

  @Column()
  identification_information: string;

  @Column()
  date_of_medical_treatment: number;

  @Column()
  adjustment_category: number;

  @Column()
  insurance_category: string;

  @Column()
  burden_category: string;

  @Column()
  sum_of_subtotal_points: number;

  @Column()
  evaluation_score: number;

  @Column()
  number_of_adjustment_points: number;

  @Column()
  this_month_total_score: number;

  @Column()
  clinical_identification: number;

  @Column()
  insurance_change_date: number;

  @Column()
  character_data: string;

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
