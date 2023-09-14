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

@Entity({ name: 'specific_equipment_m' })
export class SpecificEquipmentM extends BaseEntity {
  @Column()
  id: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  @Column()
  change_category: number;

  @IsOptional()
  @MaxLength(1)
  @Expose()
  @Column()
  master_type: string;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  @PrimaryColumn()
  specified_equipment_code: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  @Column()
  kanji_significant_digits_1: number;

  @IsOptional()
  @MaxLength(64)
  @Expose()
  @Column()
  kanji_name_1: string;

  @Expose()
  @Column()
  number_of_significant_digits: number;

  @IsOptional()
  @MaxLength(20)
  @Expose()
  @Column()
  kana_name: string;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  @Column()
  code: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  @Column()
  kanji_significant_digits_2: number;

  @IsOptional()
  @MaxLength(12)
  @Expose()
  @Column()
  kanji_name_2: string;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  @Column()
  amount_type_1: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  @Column()
  cash_amount: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  @Column()
  name_use_identification: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  @Column()
  age_addition_category: number;

  @IsOptional()
  @MaxLength(2)
  @Expose()
  @Column()
  minimum_age: string;

  @IsOptional()
  @MaxLength(2)
  @Expose()
  @Column()
  upper_age_limit: string;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  @Column()
  amount_type_2: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  @Column()
  old_amount: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  @Column()
  kanji_name_change_category: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  @Column()
  kana_name_change_category: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  @Column()
  classification_such_as_oxygen: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  @Column()
  specified_equipment_type: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  @Column()
  maximum_price: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  @Column()
  maximum_number_of_points: number;

  @IsOptional()
  @MaxLength(85)
  @Expose()
  @Column()
  spare_1: string;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  @Column()
  publication_sequence_number: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  @Column()
  abolition: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  @Column()
  date_of_change: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  @Column()
  date_of_transitional_measure: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  @Column()
  abolition_date: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  @Column()
  attached_table_number: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  @Column()
  division_number: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  @Column()
  dpc_application_category: number;

  @IsOptional()
  @MaxLength(10)
  @Expose()
  @Column()
  spare_2: string;

  @IsOptional()
  @MaxLength(10)
  @Expose()
  @Column()
  reserve_3: string;

  @IsOptional()
  @MaxLength(10)
  @Expose()
  @Column()
  spare_4: string;

  @IsOptional()
  @MaxLength(300)
  @Expose()
  @Column()
  basic_kanji_name: string;

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
