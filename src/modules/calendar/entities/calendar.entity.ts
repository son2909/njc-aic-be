import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'calendar_t' })
export class Calendar extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  account_id: number;

  @Column()
  account_classification: number;

  @Column()
  display_code_1: number;

  @Column()
  display_code_2: number;

  @Column()
  display_code_3: number;

  @Column()
  display_code_4: number;

  @Column()
  display_code_5: number;

  @Column()
  registration_date: Date;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  start_date: Date;

  @Column()
  end_date: Date;

  @Column()
  start_time: number;

  @Column()
  ending_time: number;

  @CreateDateColumn({
    default: () => 'CURRENT_TIMESTAMP',
    nullable: true,
    name: 'created_date',
  })
  created_date: Date;

  @UpdateDateColumn({
    nullable: true,
    name: 'update_date',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  update_date: Date;
}
