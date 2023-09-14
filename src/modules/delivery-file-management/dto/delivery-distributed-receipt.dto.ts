import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class DeliveryDistributedReceiptDto {
  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  account_id: number;

  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  receipt_ids: number[];
}
