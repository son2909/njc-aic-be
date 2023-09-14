import { Expose } from 'class-transformer';
import { IsNotEmpty, MaxLength } from 'class-validator';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'message_t' })
export class IssuingQueryManagement extends BaseEntity {
  @PrimaryColumn()
  query_id: number;

  @IsNotEmpty()
  @MaxLength(300)
  @Expose()
  @Column()
  query_content: string;

  @IsNotEmpty()
  @MaxLength(1000)
  @Expose()
  @Column()
  execute_query: string;

  @Expose()
  @Column({
    default: () => 'CURRENT_TIMESTAMP',
    name: 'query_last_run_date',
    type: 'timestamp',
  })
  query_last_run_date: Date;

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
