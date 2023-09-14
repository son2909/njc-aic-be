import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterDropAutocrementToGroupLinkTbl1687071650331
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE group_link_t DROP PRIMARY KEY, CHANGE group_id group_id int(10)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE group_link_t MODIFY COLUMN group_id INT AUTO_INCREMENT PRIMARY KEY;`,
    );
  }
}
