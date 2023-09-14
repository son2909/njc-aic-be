import { Expose } from 'class-transformer';

export class CalendarDto {
  @Expose()
  id: number;

  @Expose()
  account_id: number;

  @Expose()
  account_classification: number;

  @Expose()
  registration_date: Date;

  @Expose()
  title: string;

  @Expose()
  content: string;

  @Expose()
  start_date: Date;

  @Expose()
  end_date: Date;

  @Expose()
  start_time: number;

  @Expose()
  ending_time: number;

  @Expose()
  start_datetime: Date;

  @Expose()
  end_datetime: Date;

  @Expose()
  color: string;

  @Expose()
  display_code: number;
}
