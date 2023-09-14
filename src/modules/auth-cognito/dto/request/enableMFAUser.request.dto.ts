import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { CognitoUserRequestDto } from '../index';
export class EnableMFAUser {
  @IsString()
  @ApiProperty()
  totpCode: string;

  @IsString()
  @ApiProperty()
  nickname: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  friendlyDeviceName: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  sessionCode: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  AccessToken: string;
}
