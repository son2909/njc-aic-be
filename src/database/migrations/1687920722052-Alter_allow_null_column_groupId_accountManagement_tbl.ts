import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterAllowNullColumnGroupIdAccountManagementTbl1687920722052
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE account_management_t  MODIFY group_id INT NULL;`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE account_management_t  MODIFY group_id INT NOT NULL;`,
    );
  }
}
