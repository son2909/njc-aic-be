import { ApiProperty } from '@nestjs/swagger';
import { IsObject, IsOptional, IsString } from 'class-validator';

export class ChallengeParameters {
  @IsString()
  USER_ID_FOR_SRP: string;

  @IsString()
  FRIENDLY_DEVICE_NAME: string;
}
export class AuthenticateMFARequestDto {
  @IsString()
  @IsOptional()
  @ApiProperty()
  ChallengeName: string;

  @IsString()
  @ApiProperty()
  Session: string;

  @IsObject()
  @ApiProperty()
  @IsOptional()
  ChallengeParameters: ChallengeParameters;

  @IsString()
  @ApiProperty()
  totpToken: string;
}
