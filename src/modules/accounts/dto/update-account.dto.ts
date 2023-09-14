import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateAccountDto {
  @IsOptional()
  firstName: string;

  @IsOptional()
  lastName: string;

  @IsOptional()
  @IsBoolean()
  isActive: boolean;
}
