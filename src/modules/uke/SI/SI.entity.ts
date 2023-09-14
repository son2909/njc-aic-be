import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'si_t' })
export class SI extends BaseEntity {
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
  clinical_identification: number;

  @Column()
  burden_category: string;

  @Column()
  medical_practice_code: number;

  @Column()
  quantity_data: number;

  @Column()
  score: number;

  @Column()
  number_of_times: number;

  @Column()
  comment_code_1: number;

  @Column()
  character_data_1: string;

  @Column()
  comment_code_2: number;

  @Column()
  character_data_2: string;

  @Column()
  comment_code_3: number;

  @Column()
  character_data_3: string;

  @Column()
  calculation_date_1: number;

  @Column()
  calculation_date_2: number;

  @Column()
  calculation_date_3: number;

  @Column()
  calculation_date_4: number;

  @Column()
  calculation_date_5: number;

  @Column()
  calculation_date_6: number;

  @Column()
  calculation_date_7: number;

  @Column()
  calculation_date_8: number;

  @Column()
  calculation_date_9: number;

  @Column()
  calculation_date_10: number;

  @Column()
  calculation_date_11: number;

  @Column()
  calculation_date_12: number;

  @Column()
  calculation_date_13: number;

  @Column()
  calculation_date_14: number;

  @Column()
  calculation_date_15: number;

  @Column()
  calculation_date_16: number;

  @Column()
  calculation_date_17: number;

  @Column()
  calculation_date_18: number;

  @Column()
  calculation_date_19: number;

  @Column()
  calculation_date_20: number;

  @Column()
  calculation_date_21: number;

  @Column()
  calculation_date_22: number;

  @Column()
  calculation_date_23: number;

  @Column()
  calculation_date_24: number;

  @Column()
  calculation_date_25: number;

  @Column()
  calculation_date_26: number;

  @Column()
  calculation_date_27: number;

  @Column()
  calculation_date_28: number;

  @Column()
  calculation_date_29: number;

  @Column()
  calculation_date_30: number;

  @Column()
  calculation_date_31: number;

  @Column()
  memo: string;

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
