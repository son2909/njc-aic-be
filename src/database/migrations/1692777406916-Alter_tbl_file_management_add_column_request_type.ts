import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTblFileManagementAddColumnRequestType1692777406916
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE file_mamagement_t ADD request_type INT NULL;`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE file_mamagement_t DROP COLUMN request_type;`,
    );
  }
}
