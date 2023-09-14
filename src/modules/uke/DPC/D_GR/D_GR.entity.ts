import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'd_gr_t' })
export class D_GR extends BaseEntity {
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
  reason_for_calculation: number;

  @Column()
  dpc_code: string;

  @Column()
  discount_point_unit_price: number;

  @Column()
  spare_1: number;

  @Column()
  spare_2: number;

  @Column()
  spare_3: number;

  @Column()
  comprehensive_receipt_category: number;

  @Column()
  number_of_item_information: number;

  @Column()
  search_number: number;

  @Column()
  spare_4: number;

  @Column()
  billing_information: string;

  @Column()
  department_name: number;

  @Column()
  human_body_parts: number;

  @Column()
  sex: number;

  @Column()
  treatment: number;

  @Column()
  specified_disease: number;

  @Column()
  kana_name: string;

  @Column()
  patient_condition: number;

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
