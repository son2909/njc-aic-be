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

@Entity({ name: 'medical_department_m' })
export class MedicalDepartment extends BaseEntity {
  @Column()
  id: number;

  @Type(() => Number)
  @IsNumber()
  @Expose()
  @IsNotEmpty()
  @PrimaryColumn()
  code: number;

  @IsOptional()
  @MaxLength(100)
  @Expose()
  @Column()
  content: string;

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
