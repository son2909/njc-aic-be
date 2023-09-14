import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'd_kk_t' })
export class D_KK extends BaseEntity {
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
  spare_1: string;

  @Column()
  ward_transfer_presence: number;

  @Column()
  division: number;

  @Column()
  discharge_date: number;

  @Column()
  hospitalization_presence: number;

  @Column()
  age: number;

  @Column()
  body_weight: number;

  @Column()
  jcs: number;

  @Column()
  spare_2: number;

  @Column()
  burn_index: number;

  @Column()
  severity: string;

  @Column()
  reserve_3: number;

  @Column()
  spare_4: number;

  @Column()
  weeks_of_pregnancy: number;

  @Column()
  delivery_bleeding: number;

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
