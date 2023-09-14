import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTblFileManagementAddColumnRequestId1692758891966
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE file_mamagement_t ADD request_id VARCHAR(20) NULL;`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE file_mamagement_t DROP COLUMN request_id;`,
    );
  }
}
