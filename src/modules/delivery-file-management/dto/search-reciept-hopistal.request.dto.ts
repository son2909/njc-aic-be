import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class SearchReceiptHopistalRequestDto {
  @ApiProperty()
  @IsOptional()
  medical_code: string;

  @ApiProperty()
  @IsOptional()
  medical_name: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  return_destination: number;
}
