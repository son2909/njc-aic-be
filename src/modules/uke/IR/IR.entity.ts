import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'ir_t' })
export class IR extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  mi_id: number;

  @Column()
  f_id: number;

  @Column()
  num1: string;

  @Column()
  identification_information: string;

  @Column()
  examination_payment_agency: number;

  @Column()
  prefectures: number;

  @Column()
  score_table: number;

  @Column()
  medical_institution_code: string;

  @Column()
  spare: number;

  @Column()
  medical_institution_name: number;

  @Column()
  billing_date: number;

  @Column()
  multi_volume_identification_information: number;

  @Column()
  telephone_number: string;

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
