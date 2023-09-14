import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFileManagementDto {}

export class FileImportDto {
  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  fileKey: string;
}
