import { PageOptionsDto } from 'src/common/dto/pagination-options.dto';
import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';
export class ChatManagementDto {
  @IsInt()
  @Type(() => Number)
  readonly group_id: string;

  public getParrent() {
    return parent;
  }
}
