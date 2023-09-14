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

@Entity({ name: 'pharmaceutical_m' })
export class PharmaceuticalM extends BaseEntity {
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
  drug_code: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Column()
  @Expose()
  kanji_digit_number_1: number;

  @IsOptional()
  @MaxLength(64)
  @Column()
  @Expose()
  kanji_name_1: string;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Column()
  @Expose()
  number_of_kana_digits: number;

  @IsOptional()
  @MaxLength(20)
  @Column()
  @Expose()
  kana_name: string;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Column()
  @Expose()
  code: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Column()
  @Expose()
  kanji_digit_number_2: number;

  @IsOptional()
  @MaxLength(12)
  @Column()
  @Expose()
  kanji_name_2: string;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Column()
  @Expose()
  amount_type: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Column()
  @Expose()
  new_cash_amount: number;

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
  medicine: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Column()
  @Expose()
  neuroleptics: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Column()
  @Expose()
  biologics: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Column()
  @Expose()
  generic: number;

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
  dental_specific_drug: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Column()
  @Expose()
  contrast_aid: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Column()
  @Expose()
  injection_volume: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Column()
  @Expose()
  identification_of_listing_method: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Column()
  @Expose()
  related_to_product_names: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Column()
  @Expose()
  old_amount_type: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Column()
  @Expose()
  old_amount: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Column()
  @Expose()
  kanji_change_category: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Column()
  @Expose()
  kana_change_category: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Column()
  @Expose()
  dosage_form: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Column()
  @Expose()
  reserve_3: number;

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

  @IsOptional()
  @MaxLength(12)
  @Column()
  @Expose()
  drug_price_standard_code: string;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Column()
  @Expose()
  publication_sequence_number: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Column()
  @Expose()
  date_of_transitional_measure: number;

  @IsOptional()
  @MaxLength(200)
  @Column()
  @Expose()
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
