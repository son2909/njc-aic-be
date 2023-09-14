import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'receipt_information_t' })
export class ReceiptInformation extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  mi_id: number;

  @Column()
  f_id: number;

  @Column()
  p_id: number;

  @Column()
  error_f_id: number;

  @Column()
  satei_f_id: number;

  @Column()
  file_division: number;

  @Column()
  receipt_type: number;

  @Column()
  doctor_name: string;

  @Column()
  doctor_id: number;

  @Column()
  account_id: number;

  @Column()
  group_id: number;

  @Column()
  account_id2: number;

  @Column()
  invoice_id: number;

  @Column()
  clinical_department: string;

  @Column()
  total_score: number;

  @Column()
  medical_dpc_flag: number;

  @Column()
  medical_dental_flag: number;

  @Column()
  inpatient_outpatient_flag: number;

  @Column()
  social_national_flag: number;

  @Column()
  return_destination: number;

  @Column()
  error_flag: number;

  @Column()
  acknowledgment_flag: number;

  @Column()
  allocation_status_flag: number;

  @Column()
  status_check_flag: number;

  @Column()
  print_status_flag: number;

  @Column()
  delivery_status_flag: number;

  @Column()
  data_received_date: Date;

  @Column()
  billing_date: Date;

  @Column()
  date_of_medical_treatment: Date;

  @Column()
  deadline_for_inspection: Date;

  @Column()
  inspection_completion_date: Date;

  @Column()
  inspection_time: number;

  @Column()
  delivery_deadline: Date;

  @Column()
  delivery_completion_date: Date;

  @Column()
  assessment_flag: number;

  @Column()
  delayed_delivery_flag: number;

  @Column()
  inspection_incomplete_flag: number;

  @Column()
  note_contents: string;

  @Column()
  error1: string;

  @Column()
  error2: string;

  @Column()
  error3: string;

  @Column()
  error4: string;

  @Column()
  error5: string;

  @Column()
  error6: string;

  @Column()
  error7: string;

  @Column()
  error8: string;

  @Column()
  error9: string;

  @Column()
  error10: string;

  @Column()
  error11: string;

  @Column()
  error12: string;

  @Column()
  error13: string;

  @Column()
  error14: string;

  @Column()
  error15: string;

  @Column()
  error16: string;

  @Column()
  error17: string;

  @Column()
  error18: string;

  @Column()
  error19: string;

  @Column()
  error20: string;

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
