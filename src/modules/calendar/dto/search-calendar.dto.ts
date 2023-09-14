import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class SeacrhCalendarDto {
  @Expose()
  @IsNotEmpty()
  @ApiProperty()
  month: number;

  @Expose()
  @IsNotEmpty()
  @ApiProperty()
  year: number;

  @Expose()
  @IsOptional()
  @ApiProperty()
  groupIds: [];
}
