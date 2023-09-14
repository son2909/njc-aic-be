import { Expose } from 'class-transformer';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { DeliveryStatusEnum } from '../enum/delivery-file-management.enum';
export class UpdateStatusDeliveryDto {
  @IsNotEmpty()
  @Expose()
  ids: number[];

  @IsNotEmpty()
  @IsEnum(DeliveryStatusEnum)
  @Expose()
  operation_code: DeliveryStatusEnum;
}
