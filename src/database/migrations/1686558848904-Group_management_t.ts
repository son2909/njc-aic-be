import { MigrationInterface, QueryRunner } from 'typeorm';

export class GroupManagementT1686558848904 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS group_management_t (
            group_id INT AUTO_INCREMENT PRIMARY KEY,
            group_name VARCHAR(20) NOT NULL,
            group_contents VARCHAR(200) NOT NULL,
            account_id INT NOT NULL,
            created_date DATETIME,
            update_date DATETIME
        );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE IF EXISTS group_management_t;');
  }
}
