import { Expose, Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class DeliveryDistributedDto {
  @Expose()
  delivery_file_id: number;

  @Expose()
  medical_institution_name: string;

  @Expose()
  upload_date: Date;

  @Type(() => Number)
  @Expose()
  @IsNumber()
  total_allocation: number;

  @Type(() => Number)
  @Expose()
  @IsNumber()
  total_receipt: number;

  @Type(() => Number)
  @Expose()
  @IsNumber()
  total_assign: number;

  @Type(() => Number)
  @Expose()
  @IsNumber()
  total_not_assign: number;
}
