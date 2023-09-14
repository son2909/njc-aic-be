import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Validate, Length } from 'class-validator';
import { PasswordConfirmValidator } from '../../../validators/password-confirm.validator';

export class CreateAccountDto {
  @ApiProperty()
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  phonenumber: string;

  @ApiProperty()
  @IsNotEmpty()
  @Length(8, 24)
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @Validate(PasswordConfirmValidator, ['password'])
  password_confirmation: string;
}
