import { Expose } from 'class-transformer';

export class OperationAccountResponseDto {
  @Expose()
  account_id: string;

  @Expose()
  first_name: string;

  @Expose()
  given_name: string;

  @Expose()
  nickname: string;

  @Expose()
  mail_address: string;

  @Expose()
  address: string;

  @Expose()
  telephone_number: string;

  @Expose()
  group_id: string;

  @Expose()
  account_classification: string;
}
