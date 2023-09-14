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

@Entity({ name: 'high_risk_drug_m' })
export class HighRiskDrug extends BaseEntity {
  @Column()
  id: number;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  @Expose()
  @PrimaryColumn()
  drug_code: number;

  @IsOptional()
  @MaxLength(100)
  @Expose()
  @Column()
  kanji_name: string;

  @IsOptional()
  @MaxLength(100)
  @Expose()
  @Column()
  kana_name: string;

  @MaxLength(100)
  @Expose()
  @Column()
  dosage_form: string;

  @IsOptional()
  @MaxLength(50)
  @Expose()
  @Column()
  drug_price_standard_code: string;

  @IsOptional()
  @MaxLength(100)
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
    name: 'updated_date',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updated_date: Date;
}
