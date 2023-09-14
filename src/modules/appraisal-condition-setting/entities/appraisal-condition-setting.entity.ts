import { Expose } from 'class-transformer';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'appraisal_condition_setting_t' })
export class AppraisalConditionSetting extends BaseEntity {
  @PrimaryGeneratedColumn()
  setting_id: number;

  @Column()
  @Expose()
  mi_id: number;

  @Column()
  start_month: number;

  @Column()
  end_month: number;

  @Column()
  @Expose()
  clinical_department: string;

  @Column()
  @Expose()
  doctor_name: string;

  @Column()
  @Expose()
  examination_payment_agency: string;

  @Column()
  @Expose()
  identification_info: string;

  @Column()
  @Expose()
  clinical_identification: string;

  @Column()
  @Expose()
  assessment_reason: string;

  @Column()
  @Expose()
  computer_code: number;

  @CreateDateColumn({
    default: () => 'CURRENT_TIMESTAMP',
    nullable: true,
    name: 'created_date',
  })
  created_date: Date;

  @UpdateDateColumn({
    nullable: true,
    name: 'update_date',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  update_date: Date;
}
