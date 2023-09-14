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

@Entity({ name: 'auxiliary_t' })
export class Auxiliary extends BaseEntity {
  @Column()
  id: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  @Column()
  change_category: number;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  @Expose()
  @PrimaryColumn()
  medical_practice_code: number;

  @IsOptional()
  @MaxLength(64)
  @Expose()
  @Column()
  abbreviated_name: string;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  @Column()
  inclusive_unit_1: number;

  @IsOptional()
  @MaxLength(7)
  @Expose()
  @Column()
  group_number_1: string;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  @Column()
  inclusive_unit_2: number;

  @IsOptional()
  @MaxLength(7)
  @Expose()
  @Column()
  group_number_2: string;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  @Column()
  inclusive_unit_3: number;

  @IsOptional()
  @MaxLength(7)
  @Expose()
  @Column()
  group_number_3: string;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose({ name: '1_day' })
  @Column({ name: '1_day' })
  _1_day: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  @Column()
  within_the_same_month: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  @Column()
  simultaneous: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose({ name: '1_week' })
  @Column({ name: '1_week' })
  _1_week: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  @Column()
  spare_1: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  @Column()
  spare_2: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  @Column()
  reserve_3: number;

  @IsOptional()
  @MaxLength(12)
  @Expose()
  @Column()
  spare_4: string;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  @Column()
  spare_5: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  @Column()
  reserve_6: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  @Column()
  hospital_fee_identification: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  @Column()
  number_of_calculations: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  @Column()
  spare_7: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  @Column()
  spare_8: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  @Column()
  spare_9: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  @Column()
  spare_10: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
  @Column()
  established_date: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Expose()
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
