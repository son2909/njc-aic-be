import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'd_cd_t' })
export class D_CD extends BaseEntity {
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
  implementation_date: number;

  @Column()
  clinical_identification: number;

  @Column()
  sequence_number: number;

  @Column()
  action_item_number: number;

  @Column()
  system_code: number;

  @Column()
  amount_to_use: number;

  @Column()
  quantity_data: number;

  @Column()
  unit_code: number;

  @Column()
  number_of_times: number;

  @Column()
  spare: string;

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
