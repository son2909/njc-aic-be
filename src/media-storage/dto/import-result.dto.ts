import { Expose } from 'class-transformer';

export class ImportResultDto {
  @Expose()
  fileKey: string;

  @Expose()
  total: number;

  @Expose()
  totalSuccess: number;

  @Expose()
  error: string[];
}
