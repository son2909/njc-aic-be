export class ExcelEntity {
  row_id: number;

  error: string[] = [];

  isError() {
    return this.error.length !== 0;
  }
}
