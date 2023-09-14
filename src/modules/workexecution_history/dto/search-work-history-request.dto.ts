import { IsNotEmpty, IsNumber, IsOptional, Matches } from 'class-validator';
import { SearchDateWorkHistory } from '../enum/search-date-work-history.enum';

export class SearchWorkHistoryRequestDto {
  @IsNumber()
  @IsNotEmpty()
  type: SearchDateWorkHistory;

  @IsOptional()
  @Matches(/^(19|20)\d\d-(0[1-9]|1[0-2])$/, {
    message: 'fromDate must be in yyyy-mm format',
  })
  fromDate: string;

  @IsOptional()
  @Matches(/^(19|20)\d\d-(0[1-9]|1[0-2])$/, {
    message: 'toDate must be in yyyy-mm format',
  })
  toDate: string;
}
