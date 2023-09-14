import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
export class AssociateSoftwareTokenRequestDto {
  @IsString()
  @IsOptional()
  @ApiProperty()
  AccessToken: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  Session: string;
}
