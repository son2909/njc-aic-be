import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, Length, MaxLength } from 'class-validator';

export class CreateCalendarDto {
  @Expose()
  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(50)
  title: string;

  @Expose()
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
}
