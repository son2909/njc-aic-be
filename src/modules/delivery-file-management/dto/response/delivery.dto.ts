import { Expose } from 'class-transformer';

export class DeliveryDto {
  @Expose()
  delivery_file_id: number;

  @Expose()
  medical_institution_name: string;

  @Expose()
  upload_date: Date;

  @Expose()
  process_status: number;

  @Expose()
  delivery_status: number;
}
