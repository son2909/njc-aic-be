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

@Entity({ name: 'facility_standard_m_1' })
export class FacilityStandardWelfare extends BaseEntity {
  @Column()
  id: number;

  @Expose()
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  @PrimaryColumn()
  facility_standard_code: number;

  @IsOptional()
  @MaxLength(1000)
  @Expose()
  @Column()
  facility_standard_name: string;

  @IsOptional()
  @MaxLength(1000)
  @Expose()
  @Column()
  facility_standard_abbreviation: string;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  @Column()
  compatible_receipt_computer_code: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  @Column()
  revision_year: number;

  @CreateDateColumn({
    default: () => 'CURRENT_TIMESTAMP',
    name: 'created_date',
  })
  created_date: Date;

  @UpdateDateColumn({
    name: 'update_date',
    default: () => 'CURRENT_TIMESTAMP',
  })
  update_date: Date;
}
