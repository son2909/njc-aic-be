import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class SearchRemoteStaffDto {
  @ApiProperty()
  @Expose()
  @IsOptional()
  group_ids: number[];

  @ApiProperty()
  @Expose()
  @IsOptional()
  start_date: Date;

  @ApiProperty()
  @Expose()
  @IsOptional()
  end_date: Date;
}
