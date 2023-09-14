import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { Order } from './../../../enum/order.enum';

export class SearchDeliveryRequestDto {
  @ApiProperty()
  @IsOptional()
  keyword: string;

  @ApiProperty()
  @IsOptional()
  filter: FilterOption[];

  @ApiProperty()
  @IsOptional()
  id: number;
}

export class FilterOption {
  @ApiProperty()
  @IsOptional()
  key: string;

  @ApiProperty()
  @IsOptional()
  value: string[];

  @ApiProperty()
  @IsOptional()
  @IsEnum(Order)
  order: Order;
}
