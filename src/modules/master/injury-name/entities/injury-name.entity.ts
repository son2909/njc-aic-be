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

@Entity({ name: 'injury_name_m' })
export class InjuryName extends BaseEntity {
  @Column()
  id: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Column()
  @Expose()
  change_category: number;

  @MaxLength(1)
  @IsOptional()
  @Column()
  @Expose()
  master_type: string;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  @Expose()
  @PrimaryColumn()
  injury_name_code: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Column()
  @Expose()
  destination_code: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Column()
  @Expose()
  basic_name_number_of_digits: number;

  @MaxLength(60)
  @IsOptional()
  @Column()
  @Expose()
  basic_name: string;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Column()
  @Expose()
  abbreviated_name_digits: number;

  @MaxLength(40)
  @IsOptional()
  @Column()
  @Expose()
  short_name: string;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Column()
  @Expose()
  kana_name_digits: number;

  @MaxLength(100)
  @IsOptional()
  @Column()
  @Expose()
  kana_name: string;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Column()
  @Expose()
  control_number: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Column()
  @Expose()
  adoption_category: number;

  @MaxLength(4)
  @IsOptional()
  @Column()
  @Expose()
  exchange_code: string;

  @MaxLength(5)
  @IsOptional()
  @Column()
  @Expose()
  spare_1: string;

  @MaxLength(5)
  @IsOptional()
  @Column()
  @Expose()
  spare_2: string;

  @MaxLength(5)
  @IsOptional()
  @Column()
  @Expose()
  icd101: string;

  @MaxLength(5)
  @IsOptional()
  @Column()
  @Expose()
  icd102: string;

  @MaxLength(5)
  @IsOptional()
  @Column()
  @Expose()
  reserve_3: string;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Column()
  @Expose()
  single_use_prohibited_category: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Column()
  @Expose()
  non_claimable_category: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Column()
  @Expose()
  specific_disease_target_category: number;

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
  basic_name_change: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Column()
  @Expose()
  abbreviated_name_change: number;

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
  adoption_category_change: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Column()
  @Expose()
  disease_name_exchange_code_change: number;

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
  spare_5: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Column()
  @Expose()
  dental_abbreviation: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Column()
  @Expose()
  category_for_outpatient: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Column()
  @Expose()
  dentistry_category_for_specific_diseases: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Column()
  @Expose()
  single_use_prohibited_category_change: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Column()
  @Expose()
  non_claimable_category_change: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Column()
  @Expose()
  specific_disease_target_category_change: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Column()
  @Expose()
  disease_name_control_number: number;

  @MaxLength(40)
  @IsOptional()
  @Column()
  @Expose()
  dental_abbreviation_str: string;

  @MaxLength(10)
  @IsOptional()
  @Column()
  @Expose()
  reserve_6: string;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Column()
  @Expose()
  spare_7: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Column()
  @Expose()
  dental_abbreviation_number_of_digits: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Column()
  @Expose()
  intractable_disease_outpatient_target_category: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Column()
  @Expose()
  dentistry_specific_disease_target_category: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Column()
  @Expose()
  icd101_change: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Column()
  @Expose()
  icd102_change: number;

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
