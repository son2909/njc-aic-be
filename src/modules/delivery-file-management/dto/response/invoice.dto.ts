import { Expose } from 'class-transformer';
import { InvoiceItemDto } from './invoice-item.dto';

export class InvoiceDto {
  @Expose()
  item: InvoiceItemDto[];

  @Expose()
  post_code: string;

  @Expose()
  name: string;

  @Expose()
  total_price: number = 0;

  @Expose()
  total_price_tax: number = 0;

  @Expose()
  tax: number = 0;

  file_id: number;

  mi_id: number;
}
