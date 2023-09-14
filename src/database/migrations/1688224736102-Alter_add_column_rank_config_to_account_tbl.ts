import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterAddColumnRankConfigToAccountTbl1688224736102
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE account_management_t ADD COLUMN rank_config INT`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE account_management_t DROP COLUMN rank_config`,
    );
  }
}
