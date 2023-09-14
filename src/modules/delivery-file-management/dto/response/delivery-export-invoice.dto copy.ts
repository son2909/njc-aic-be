import { Expose } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class ExportInvoiceDto {
  @Expose()
  @IsOptional()
  note: string;

  @Expose()
  @IsOptional()
  date: Date;

  @Expose()
  @IsOptional()
  ids: number[];
}
