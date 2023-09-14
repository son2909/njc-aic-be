import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'dpc_error_t' })
export class DpcError extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  mi_id: number;

  @Column()
  f_id: number;

  @Column()
  p_id: number;

  @Column()
  hidden: number;

  @Column()
  error_contents_update: string;

  @Column()
  date_of_medical_treatment: string;

  @Column()
  national_insurance_social_insurance: string;

  @Column()
  entry_exit_classification: string;

  @Column()
  receipt_type: string;

  @Column()
  clinical_department: string;

  @Column()
  ward_name: string;

  @Column()
  doctor_name: string;

  @Column()
  medical_record_number: number;

  @Column()
  patient_name: string;

  @Column()
  error_code: string;

  @Column()
  error_contents: string;

  @Column()
  target_code: string;

  @Column()
  target_code_name: string;

  @Column()
  icd10_code: string;

  @Column()
  actual_score: number;

  @Column()
  calculation_result: number;

  @Column()
  department_2: string;

  @Column()
  department_3: string;

  @Column()
  arbitrary_name_1: string;

  @Column()
  arbitrary_name_2: string;

  @Column()
  arbitrary_name_3: string;

  @Column()
  reference_disease_name: string;

  @Column()
  calculation_date: string;

  @Column()
  missing_comment: string;

  @Column()
  patient_condition_1: string;

  @Column()
  patient_condition_2: string;

  @Column()
  patient_condition_3: string;

  @Column()
  patient_condition_4: string;

  @Column()
  patient_condition_5: string;

  @Column()
  patient_condition_6: string;

  @Column()
  patient_condition_7: string;

  @Column()
  patient_condition_8: string;

  @Column()
  patient_condition_9: string;

  @Column()
  patient_condition_10: string;

  @Column()
  patient_condition11: string;

  @Column()
  patient_condition12: string;

  @Column()
  patient_condition13: string;

  @Column()
  patient_condition14: string;

  @Column()
  patient_condition15: string;

  @Column()
  patient_condition16: string;

  @Column()
  patient_condition17: string;

  @Column()
  patient_condition18: string;

  @Column()
  patient_condition19: string;

  @Column()
  patient_condition20: string;

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
