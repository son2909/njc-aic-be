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

@Entity({ name: 'doctor_m' })
export class Doctor extends BaseEntity {
  @Column()
  id: number;

  @Column()
  mi_id: number;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  @Expose({ name: 'doctor_id' })
  @PrimaryColumn()
  doctor_id: number;

  @IsOptional()
  @MaxLength(100)
  @Expose({ name: 'doctor_name' })
  @Column()
  doctor_name: string;

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
