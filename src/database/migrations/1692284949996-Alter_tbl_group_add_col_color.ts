import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTblGroupAddColColor1692284949996
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE group_management_t ADD color int NULL;`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE group_management_t DROP COLUMN color;`,
    );
  }
}
