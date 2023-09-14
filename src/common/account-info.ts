import { Expose } from 'class-transformer';

export class AccountInfo {
  @Expose()
  account_id: number;

  @Expose()
  first_name: string;

  @Expose()
  nickname: string;

  @Expose()
  given_name: string;

  @Expose()
  mail_address: string;

  @Expose()
  address: string;

  @Expose()
  telephone_number: string;

  @Expose()
  group_id: number;

  @Expose()
  account_classification: string;

  @Expose()
  mi_id: number;
}
