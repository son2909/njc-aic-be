import { Expose } from 'class-transformer';

export class AnnouncementDto {
  @Expose()
  announcement_id: number;

  @Expose()
  title: string;

  @Expose()
  content: string;

  @Expose()
  date: Date;

  @Expose()
  display_expiration_date: Date;

  @Expose()
  display_code_1: number;

  @Expose()
  display_code_2: number;

  @Expose()
  display_code_3: number;

  @Expose()
  display_code_4: number;

  @Expose()
  display_code_5: number;

  @Expose()
  record_creation_date: Date;

  @Expose()
  record_update_date: Date;

  @Expose()
  account_id: number;

  @Expose()
  account_nickname: string;
}
