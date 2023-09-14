import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'd_sk_t' })
export class D_SK extends BaseEntity {
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
  medical_practice_code: number;

  @Column()
  division_number: string;

  @Column()
  implementation_date: number;

  @Column()
  spare: number;

  @Column()
  medical_treatment_code: number;

  @Column()
  treatment_name: string;

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
