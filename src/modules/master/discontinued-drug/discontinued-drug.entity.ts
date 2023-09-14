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

@Entity({ name: 'discontinued_drug_m' })
export class DiscontinuedDrugM extends BaseEntity {
  @Column()
  id: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  @Column()
  dosage_form: number;

  @IsOptional()
  @MaxLength(64)
  @Expose()
  @Column()
  kanji_name: string;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  @Column()
  amount_type: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  @Column()
  amount_of_money: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  @Column()
  abolition_date: number;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  @Expose()
  @PrimaryColumn()
  drug_code: number;

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
