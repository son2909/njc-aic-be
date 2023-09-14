import { ApiProperty } from '@nestjs/swagger';
import { MasterTable } from './enum/master-table.enum';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Expose } from 'class-transformer';

export class SearchMasterDto {
  @ApiProperty()
  @IsEnum(MasterTable)
  @Expose()
  @IsNotEmpty()
  table;

  @ApiProperty()
  @Expose()
  @IsString()
  @IsOptional()
  keyword;
}
