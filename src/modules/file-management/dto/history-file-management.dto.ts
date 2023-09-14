import { MedicalDPCFlagEnum } from 'src/modules/receipt-information/enum';
import { FileDivisionEnum } from '../enum/file-division.enum';

export class HistoryFileManagementDto {
  file_name: string;

  mi_id: number;

  file_division: FileDivisionEnum;

  account_id: number;

  total_number: number;

  request_type?: MedicalDPCFlagEnum;

  request_id?: string;
}
