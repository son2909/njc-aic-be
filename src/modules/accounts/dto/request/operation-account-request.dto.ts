import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional } from 'class-validator';
import { OperationCodeEnum } from '../../../../enum/operation-code.enum';
export class OperationAccountRequestDto {
  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  account_id: number;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  first_name: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  given_name: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  mail_address: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  address: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  telephone_number: string;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  account_classification: number;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  mi_id: number;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  operation_code: OperationCodeEnum;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  unit_price: number;
}
