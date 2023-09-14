import { IsEnum, IsNotEmpty, Max, Min } from 'class-validator';
import { CompletionFlag } from '../enum/delivery-file-management.enum';

export class UpdateCompleteFlagDto {
  @IsNotEmpty()
  @Min(1)
  @Max(15)
  account_number: number;

  @IsNotEmpty()
  @IsEnum(CompletionFlag)
  completion_flag: CompletionFlag;
}
