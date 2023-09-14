import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFileManagementDto {}

export class HeaderExportCsvDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  title: string;
}
