import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';
export class DisableMFAUser {
  @IsString()
  @ApiProperty()
  @IsOptional()
  totpCode: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  friendlyDeviceName: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  userName: string;
}
