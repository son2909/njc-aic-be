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

@Entity({ name: 'abolished_medical_practice_m' })
export class AbolishedMedicalPracticeM extends BaseEntity {
  @Column()
  id: number;

  @IsOptional()
  @MaxLength(7)
  @Expose({ name: 'division' })
  @Column()
  division: string;

  @IsOptional()
  @MaxLength(64)
  @Expose({ name: 'abbreviated_kanji_name' })
  @Column()
  abbreviated_kanji_name: string;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose({ name: 'score_identification' })
  @Column()
  score_identification: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose({ name: 'points' })
  @Column()
  points: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose({ name: 'abolition_date' })
  @Column()
  abolition_date: number;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  @Expose({ name: 'medical_practice_code' })
  @PrimaryColumn()
  medical_practice_code: number;

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
