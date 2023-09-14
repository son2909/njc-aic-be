import { Expose } from 'class-transformer';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'receipt_distribution_setting_t' })
export class ReceiptDistributionSetting extends BaseEntity {
  @PrimaryGeneratedColumn()
  setting_id: number;

  @Expose()
  @Column()
  p_id: number;

  @Expose()
  @Column()
  mi_id: number;

  @Expose()
  @Column()
  medical_and_dental: number;

  @Expose()
  @Column()
  inpatient_outpatient: number;

  @Expose()
  @Column()
  social_insurance_national_insurance: number;

  @Expose()
  @Column()
  date_of_medical_treatment: Date;

  @Expose()
  @Column()
  clinical_department: number;

  @Expose()
  @Column()
  presence_or_absence_of_errors: number;

  @Expose()
  @Column()
  more_than_the_corresponding_score_flag: number;

  @Expose()
  @Column()
  flag_below_the_score: number;

  @Expose()
  @Column()
  account_id: number;

  @CreateDateColumn({
    default: () => 'CURRENT_TIMESTAMP',
    nullable: true,
    name: 'created_date',
  })
  created_date: Date;

  @UpdateDateColumn({
    name: 'update_date',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  update_date: Date;
}
