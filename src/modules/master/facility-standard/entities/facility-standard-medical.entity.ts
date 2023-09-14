import { Expose, Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'facility_standard_m_2' })
export class FacilityStandardMedical extends BaseEntity {
  @Column()
  id: number;

  @Expose()
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  @PrimaryColumn()
  facility_standard_code: number;

  @Expose()
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Column()
  acquired: number;

  @Expose()
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
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
