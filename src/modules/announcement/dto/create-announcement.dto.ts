import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { DisplayCodeOne } from './enum/announcement-display-1.enum';

export class CreateAnnouncementDto {
  @ApiProperty()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  content: string;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Date)
  display_expiration_date: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(DisplayCodeOne)
  display_code_1: DisplayCodeOne;

  // @IsNotEmpty()
  // date: Date;
}
