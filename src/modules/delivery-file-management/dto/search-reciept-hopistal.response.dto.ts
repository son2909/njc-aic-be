import { Expose } from 'class-transformer';

export class SearchReceiptHopistalResponsetDto {
  @Expose()
  id: number;

  @Expose()
  mi_id: string;

  @Expose()
  medical_institution_name: string;

  @Expose()
  date_of_medical_treatment: Date;

  @Expose()
  total_number: number;

  @Expose()
  total_update: number;

  @Expose()
  data_received_date: Date;

  @Expose()
  delivery_completion_date: Date;
}
