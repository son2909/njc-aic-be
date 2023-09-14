import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { MasterTable } from './enum/master-table.enum';

export class DetailMasterDto {
  @ApiProperty()
  @IsEnum(MasterTable)
  @Expose()
  @IsNotEmpty()
  table;

  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  id;
}
