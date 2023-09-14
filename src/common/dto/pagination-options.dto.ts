import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';
import { Order } from '../../../src/enum/order.enum';
import { Type } from 'class-transformer';

export class PageOptionsDto<T = {}> {
  @IsOptional()
  readonly searchOption: T | any;

  @IsEnum(Order)
  @IsOptional()
  readonly order?: Order = Order.ASC;

  @IsInt()
  @Min(1)
  @IsOptional()
  @Type(() => Number)
  readonly page?: number = 1;

  @IsInt()
  @Min(1)
  @Max(Number.MAX_SAFE_INTEGER)
  @IsOptional()
  @Type(() => Number)
  readonly limit?: number = 20;

  get skip(): number {
    return (this.page - 1) * this.limit;
  }
}
