import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateFileManagementDto {}

export class AIImportExcelDto {
  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  fileKey: string;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  mi_id: number;
}
