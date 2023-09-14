import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'uke_code_conversion_m' })
export class UkeCodeConversion extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  main_code: number;

  @Column()
  code_name: string;

  @Column()
  code: string;

  @Column()
  content: string;

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
