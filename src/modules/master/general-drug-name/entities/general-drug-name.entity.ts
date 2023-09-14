import { Expose, Type } from 'class-transformer';
import { IsNumber, IsOptional, MaxLength } from 'class-validator';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'general_drug_name_m' })
export class GeneralDrugName extends BaseEntity {
  @Column()
  id: number;

  @IsOptional()
  @MaxLength(100)
  @Expose()
  /** 一般名コード*/
  @PrimaryColumn()
  common_name_code: string;

  @IsOptional()
  @MaxLength(100)
  @Expose()
  /** 区分*/
  @Column()
  division: string;

  @IsOptional()
  @MaxLength(100)
  @Expose()
  /** 一般名処方の標準的な記載*/
  @Column()
  generic_name_prescription: string;

  @IsOptional()
  @MaxLength(100)
  @Expose()
  /** 成分名*/
  @Column()
  ingredient_name: string;

  @IsOptional()
  @MaxLength(100)
  @Expose()
  /** 規格 */
  @Column()
  standard: string;

  @IsOptional()
  @MaxLength(100)
  @Expose()
  /** 一般名処方加算対象*/
  @Column()
  addition_target: string;

  @IsOptional()
  @MaxLength(100)
  @Expose()
  /** 例外コード*/
  @Column()
  exception_code: string;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  /** 同一剤形・規格内の最低薬価*/
  @Column()
  lowest_drug_price: number;

  @IsOptional()
  @MaxLength(100)
  @Expose()
  /** 備考*/
  @Column()
  remarks: string;

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

  constructor(partial: Partial<GeneralDrugName>) {
    super();
    Object.assign(this, partial);
  }
}
