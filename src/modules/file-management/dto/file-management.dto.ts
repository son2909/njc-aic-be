import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class FileManagementDto {
  @ApiProperty()
  @Expose()
  file_id: number;

  @ApiProperty()
  @Expose()
  mi_name: string;

  @ApiProperty()
  @Expose()
  mi_id: number;

  @ApiProperty()
  @Expose()
  upload_date: Date;

  @ApiProperty()
  @Expose()
  file_type: number;

  @ApiProperty()
  @Expose()
  file_type_name: string;

  @ApiProperty()
  @Expose()
  file_name: string;

  @ApiProperty()
  @Expose()
  total_number: number;
}
