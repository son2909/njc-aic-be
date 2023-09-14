import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { FileDivisionEnum } from '../../file-management/enum/file-division.enum';
import { Type } from 'class-transformer';

export class PayloadUkeDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(FileDivisionEnum)
  file_division: FileDivisionEnum;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  delivery_deadline: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  error_file_key: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  request_id: string;
}

export class UpdateContentErrorDto {
  @ApiProperty()
  @IsNotEmpty()
  id: number;

  @ApiPropertyOptional()
  @IsOptional()
  error_contents_update: string;
}

export class PartialUpdateErrorDto {
  @IsArray()
  @Type(() => UpdateContentErrorDto)
  @ValidateNested({ each: true })
  data: UpdateContentErrorDto[];

  @ApiProperty({ example: 1, description: 'Medical: 1 or DPC: 2' })
  @IsNotEmpty()
  type: number;
}

export class CommentUkeRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  id: number;

  @ApiPropertyOptional()
  @IsOptional()
  memo: string;
}
export class AddCommentUkeTblDto {
  @IsArray()
  @Type(() => CommentUkeRequestDto)
  @ValidateNested({ each: true })
  data: CommentUkeRequestDto[];

  @ApiProperty({ example: 1, description: 'Medical: 1 or DPC: 2' })
  @IsNotEmpty()
  type: number;
}
