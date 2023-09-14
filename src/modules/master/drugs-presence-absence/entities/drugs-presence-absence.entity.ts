import { Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional, MaxLength } from 'class-validator';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'drugs_presence_absence_master' })
export class DrugsPresenceAbsence extends BaseEntity {
  @Column()
  id: number;

  @IsNotEmpty()
  @MaxLength(50)
  @Expose()
  @PrimaryColumn()
  drug_code: string;

  @IsOptional()
  @MaxLength(50)
  @Expose()
  @Column()
  ingredient_name: string;

  @IsOptional()
  @MaxLength(50)
  @Expose()
  @Column()
  product_name: string;

  @IsOptional()
  @MaxLength(50)
  @Expose()
  @Column()
  information_of_generic_drugs: string;

  @IsOptional()
  @Expose()
  @Column()
  listing_date: Date;

  @IsOptional()
  @MaxLength(50)
  @Expose()
  @Column()
  expire_date_transitional: string;

  @IsOptional()
  @MaxLength(50)
  @Expose()
  @Column()
  remarks: string;

  @IsOptional()
  @MaxLength(50)
  @Expose()
  @Column()
  items_excluded_calculation: string;

  @CreateDateColumn({
    default: () => 'CURRENT_TIMESTAMP',
    name: 'record_creation_date',
    type: 'timestamp',
  })
  record_creation_date: Date;

  @UpdateDateColumn({
    name: 'record_update_date',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  record_update_date: Date;
}
