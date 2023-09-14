import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
export class GetSignedUrlDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  fileName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  contentType: string;
}
