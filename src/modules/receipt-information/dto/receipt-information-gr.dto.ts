import { Expose } from 'class-transformer';
import { StatusCheckFlagEnum } from '../enum';

export class ReceiptInformationGrDto {
  @Expose()
  delivery_file_id: number;

  @Expose()
  receipt_information_id: number;

  @Expose()
  mi_id: number;

  @Expose()
  medical_institution_name: string;

  @Expose()
  date_of_medical_treatment: Date;

  @Expose()
  data_received_date: Date;

  @Expose()
  delivery_deadline: Date;

  @Expose()
  group_id: number;

  @Expose()
  count_status_check_flag_pending: number;

  @Expose()
  count_status_check_flag_done: number;

  @Expose()
  count_status_check_flag_processing: number;

  @Expose()
  count_status_check_flag: number;

  @Expose()
  account_number: number;

  @Expose()
  completion_date: Date;

  @Expose()
  completion_flag: number;

  @Expose()
  status_check_flag: StatusCheckFlagEnum;
}
