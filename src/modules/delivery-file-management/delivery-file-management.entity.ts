import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'delivery_file_management_t' })
export class DeliveryFileManagement extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  file_id: number;

  @Column()
  file_name: string;

  @Column()
  mi_id: number;

  @Column()
  file_type: number;

  @Column()
  upload_date: Date;

  @Column()
  account_id: number;

  @Column()
  total_number: number;

  @Column()
  sorting_status_flag: number;

  @Column()
  delivery_status: number;

  @Column()
  account_id1: number;

  @Column()
  allocation_number1: number;

  @Column()
  completion_flag1: number;

  @Column()
  completion_date1: Date;

  @Column()
  account_id2: number;

  @Column()
  allocation_number2: number;

  @Column()
  completion_flag2: number;

  @Column()
  completion_date2: Date;

  @Column()
  account_id3: number;

  @Column()
  allocation_number3: number;

  @Column()
  completion_flag3: number;

  @Column()
  completion_date3: Date;

  @Column()
  account_id4: number;

  @Column()
  allocation_number4: number;

  @Column()
  completion_flag4: number;

  @Column()
  completion_date4: Date;

  @Column()
  account_id5: number;

  @Column()
  allocation_number5: number;

  @Column()
  completion_flag5: number;

  @Column()
  completion_date5: Date;

  @Column()
  account_id6: number;

  @Column()
  allocation_number6: number;

  @Column()
  completion_flag6: number;

  @Column()
  completion_date6: Date;

  @Column()
  account_id7: number;

  @Column()
  allocation_number7: number;

  @Column()
  completion_flag7: number;

  @Column()
  completion_date7: Date;

  @Column()
  account_id8: number;

  @Column()
  allocation_number8: number;

  @Column()
  completion_flag8: number;

  @Column()
  completion_date8: Date;

  @Column()
  account_id9: number;

  @Column()
  allocation_number9: number;

  @Column()
  completion_flag9: number;

  @Column()
  completion_date9: Date;

  @Column()
  account_id10: number;

  @Column()
  allocation_number10: number;

  @Column()
  completion_flag10: number;

  @Column()
  completion_date10: Date;

  @Column()
  account_id11: number;

  @Column()
  allocation_number11: number;

  @Column()
  completion_flag11: number;

  @Column()
  completion_date11: Date;

  @Column()
  account_id12: number;

  @Column()
  allocation_number12: number;

  @Column()
  completion_flag12: number;

  @Column()
  completion_date12: Date;

  @Column()
  account_id13: number;

  @Column()
  allocation_number13: number;

  @Column()
  completion_flag13: number;

  @Column()
  completion_date13: Date;

  @Column()
  account_id14: number;

  @Column()
  allocation_number14: number;

  @Column()
  completion_flag14: number;

  @Column()
  completion_date14: Date;

  @Column()
  account_id15: number;

  @Column()
  allocation_number15: number;

  @Column()
  completion_flag15: number;

  @Column()
  completion_date15: Date;

  @CreateDateColumn({
    default: () => 'CURRENT_TIMESTAMP',
    nullable: true,
    name: 'created_date',
  })
  created_date: Date;

  @UpdateDateColumn({
    nullable: true,
    name: 'updated_date',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updated_date: Date;

  constructor(partial: Partial<DeliveryFileManagement>) {
    super();
    Object.assign(this, partial);
  }
}
