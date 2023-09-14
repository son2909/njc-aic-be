import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsObject } from 'class-validator';
import { MasterTable } from './enum/master-table.enum';

export class UpdateMasterDto {
  @ApiProperty()
  @IsEnum(MasterTable)
  @Expose()
  @IsNotEmpty()
  table;

  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  @IsObject()
  data: object;
}
