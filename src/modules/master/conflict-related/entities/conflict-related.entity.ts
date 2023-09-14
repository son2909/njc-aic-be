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

@Entity({ name: 'conflict_related_t' })
export class ConflictRelated extends BaseEntity {
  @Column()
  id: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose({ name: 'change_category' })
  @Column()
  change_category: number;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  @Expose({ name: 'medical_practice_code_1' })
  @PrimaryColumn()
  medical_practice_code_1: number;

  @IsOptional()
  @MaxLength(64)
  @Expose({ name: 'abbreviated_name_1' })
  @Column()
  abbreviated_name_1: string;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose({ name: 'medical_practice_code_2' })
  @Column()
  medical_practice_code_2: number;

  @IsOptional()
  @MaxLength(64)
  @Expose({ name: 'abbreviated_name_2' })
  @Column()
  abbreviated_name_2: string;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose({ name: 'contradictory_classification' })
  @Column()
  contradictory_classification: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose({ name: 'special_conditions' })
  @Column()
  special_conditions: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose({ name: 'spare' })
  @Column()
  spare: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose({ name: 'established_date' })
  @Column()
  established_date: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose({ name: 'abolition_date' })
  @Column()
  abolition_date: number;

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
