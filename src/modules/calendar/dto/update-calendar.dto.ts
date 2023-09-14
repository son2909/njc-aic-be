import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

export class UpdateCalendarDto {
  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(300)
  content: string;

  @ApiProperty()
  @IsNotEmpty()
  start_date: Date;

  @ApiProperty()
  @IsNotEmpty()
  end_date: Date;

  @IsOptional()
  display_code: number;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(50)
  title: string;
}
