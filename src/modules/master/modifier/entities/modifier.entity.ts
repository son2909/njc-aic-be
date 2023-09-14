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

@Entity({ name: 'modifier_m' })
export class Modifier extends BaseEntity {
  @Column()
  id: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Column()
  @Expose()
  change_category: number;

  @IsOptional()
  @MaxLength(1)
  @Column()
  @Expose()
  master_type: string;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  @PrimaryColumn()
  @Expose()
  code: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Column()
  @Expose()
  spare_1: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Column()
  @Expose()
  spare_2: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Column()
  @Expose()
  number_of_digits: number;

  @IsOptional()
  @MaxLength(40)
  @Column()
  @Expose()
  name: string;

  @IsOptional()
  @MaxLength(24)
  @Column()
  @Expose()
  spare_3: string;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Column()
  @Expose()
  kana_name_digits: number;

  @IsOptional()
  @MaxLength(60)
  @Column()
  @Expose()
  kana_name: string;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Column()
  @Expose()
  spare_4: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Column()
  @Expose()
  change_of_name: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Column()
  @Expose()
  kana_name_change: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Column()
  @Expose()
  listing_date: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Column()
  @Expose()
  date_of_change: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Column()
  @Expose()
  abolition_date: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Column()
  @Expose()
  control_number: number;

  @IsOptional()
  @MaxLength(9)
  @Column()
  @Expose()
  exchange_code: string;

  @IsOptional()
  @MaxLength(8)
  @Column()
  @Expose()
  division: string;

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
