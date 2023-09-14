import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterAddConstraintToGroupLinkTbl1687073269599
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE group_link_t ADD CONSTRAINT group_link_constraint UNIQUE (group_id, account_id);`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE group_link_t DROP CONSTRAINT group_link_constraint;`,
    );
  }
}
