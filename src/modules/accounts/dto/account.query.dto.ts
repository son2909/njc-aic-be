import { ApiPropertyOptional } from '@nestjs/swagger';
import { Allow, IsOptional } from 'class-validator';

export class AccountQueryDto {
  @Allow()
  @ApiPropertyOptional()
  @IsOptional()
  keyword: string;
}
