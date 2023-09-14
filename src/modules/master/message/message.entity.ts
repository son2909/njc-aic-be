import { Expose, Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, MaxLength } from 'class-validator';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'message_t' })
export class Message extends BaseEntity {
  @Column()
  @PrimaryColumn()
  message_id: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  mi_id: number;

  @IsNotEmpty()
  @MaxLength(80)
  @Expose()
  @Column()
  converted_content: string;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  errer_level: number;

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
