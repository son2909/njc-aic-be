import { Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class ReceiptInformationListDto {
  @Expose()
  @IsNotEmpty()
  delivery_id: number;

  @Expose()
  @IsOptional()
  return_destination: number;

  @IsOptional()
  isAll?: boolean = false;
}
