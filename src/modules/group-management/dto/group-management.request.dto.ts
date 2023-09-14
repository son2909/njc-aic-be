import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class GroupCreationDto {
  @ApiProperty()
  @IsNotEmpty()
  group_name: string;

  @ApiProperty()
  @IsNotEmpty()
  group_contents: string;
}

export class AddMemberToGroupDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  group_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  account_id: number;
}

export class RenameGroupDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  group_name: string;
}
