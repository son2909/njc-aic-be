import { Expose, Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, MaxLength } from 'class-validator';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'inclusive_t' })
export class Inclusive extends BaseEntity {
  @Column()
  id: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose({ name: 'change_category' })
  @Column()
  change_category: number;

  @MaxLength(7)
  @IsNotEmpty()
  @Expose({ name: 'group_number' })
  @PrimaryGeneratedColumn()
  group_number: string;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  @Expose({ name: 'medical_practice_code' })
  @PrimaryColumn()
  medical_practice_code: number;

  @IsOptional()
  @MaxLength(64)
  @Expose({ name: 'abbreviated_name' })
  @Column()
  abbreviated_name: string;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose({ name: 'special_conditions' })
  @Column()
  special_conditions: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose({ name: 'established_date' })
  @Column()
  established_date: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose({ name: 'abolition_date' })
  @Column()
  abolition_date: number;

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
