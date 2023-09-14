import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'd_sy_t' })
export class D_SY extends BaseEntity {
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
  injury_name_code: number;

  @Column()
  treatment_start_date: number;

  @Column()
  outcome_category: number;

  @Column()
  modifier_code: string;

  @Column()
  injury_name: string;

  @Column()
  main_injury: number;

  @Column()
  supplement: string;

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
