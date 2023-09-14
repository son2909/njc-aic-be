import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'd_mf_t' })
export class D_MF extends BaseEntity {
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
  window_burden_category: number;

  @Column()
  spare_1: number;

  @Column()
  spare_2: number;

  @Column()
  reserve_3: number;

  @Column()
  reserve_4: number;

  @Column()
  reserve_5: number;

  @Column()
  reserve_6: number;

  @Column()
  reserve_7: number;

  @Column()
  reserve_8: number;

  @Column()
  reserve_9: number;

  @Column()
  reserve_10: number;

  @Column()
  reserve_11: number;

  @Column()
  reserve_12: number;

  @Column()
  reserve_13: number;

  @Column()
  reserve_14: number;

  @Column()
  reserve_15: number;

  @Column()
  reserve_16: number;

  @Column()
  reserve_17: number;

  @Column()
  reserve_18: number;

  @Column()
  reserve_19: number;

  @Column()
  reserve_20: number;

  @Column()
  reserve_21: number;

  @Column()
  reserve_22: number;

  @Column()
  reserve_23: number;

  @Column()
  reserve_24: number;

  @Column()
  reserve_25: number;

  @Column()
  reserve_26: number;

  @Column()
  reserve_27: number;

  @Column()
  reserve_28: number;

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
