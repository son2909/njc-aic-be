import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'mf_t' })
export class MF extends BaseEntity {
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
  window_burden_category: number;

  @Column()
  spare_1: number;

  @Column()
  spare_2: number;

  @Column()
  reserve_3: number;

  @Column()
  spare_4: number;

  @Column()
  spare_5: number;

  @Column()
  spare_6: number;

  @Column()
  spare_7: number;

  @Column()
  spare_8: number;

  @Column()
  spare_9: number;

  @Column()
  spare_10: number;

  @Column()
  spare_11: number;

  @Column()
  spare_12: number;

  @Column()
  spare_13: number;

  @Column()
  spare_14: number;

  @Column()
  spare_15: number;

  @Column()
  spare_16: number;

  @Column()
  spare_17: number;

  @Column()
  spare_18: number;

  @Column()
  spare_19: number;

  @Column()
  spare_20: number;

  @Column()
  spare_21: number;

  @Column()
  spare_22: number;

  @Column()
  spare_23: number;

  @Column()
  spare_24: number;

  @Column()
  spare_25: number;

  @Column()
  spare_26: number;

  @Column()
  spare_27: number;

  @Column()
  spare_28: number;

  @Column()
  spare_29: number;

  @Column()
  spare_30: number;

  @Column()
  spare_31: number;

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
