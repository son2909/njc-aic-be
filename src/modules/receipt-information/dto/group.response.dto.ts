import { Expose } from 'class-transformer';
import { ReceiptInformationGrDto } from './receipt-information-gr.dto';

export class GroupRIResponseDto {
  @Expose()
  group_id: number;

  @Expose()
  group_name: string;

  receipt_information: ReceiptInformationGrDto[];
}
