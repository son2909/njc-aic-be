import { Expose, Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, MaxLength } from 'class-validator';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'number_of_calculations_t' })
export class NumberOfCalculationsT extends BaseEntity {
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  @Column()
  change_category: number;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  @Expose()
  @PrimaryGeneratedColumn()
  medical_practice_code: number;

  @IsOptional()
  @MaxLength(64)
  @Expose()
  @Column()
  abbreviated_name: string;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  @Column()
  unit_of_measure_code: number;

  @IsOptional()
  @MaxLength(12)
  @Expose()
  @Column()
  accounting_unit_name: string;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  @Column()
  number_of_calculations: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  @Column()
  special_conditions: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  @Column()
  spare_1: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  @Column()
  spare_2: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  @Column()
  spare_3: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  @Column()
  spare_4: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  @Column()
  spare_5: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  @Column()
  established_date: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
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
