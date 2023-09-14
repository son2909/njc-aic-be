import { Expose } from 'class-transformer';

export class InvoiceItemDto {
  @Expose()
  delivery_deadline: Date;

  @Expose()
  price: number;

  @Expose()
  quantity: number;

  @Expose()
  total_price: number;

  @Expose()
  name: string;

  file_id: number;

  mi_id: number;

  delivery_deadline_str: string;
}
