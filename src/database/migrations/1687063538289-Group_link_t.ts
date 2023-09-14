import { MigrationInterface, QueryRunner } from 'typeorm';

export class GroupLinkT1687063538289 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS group_link_t (
            group_id INT AUTO_INCREMENT PRIMARY KEY,
            account_id INT NOT NULL,
            created_date DATETIME,
            update_date DATETIME
        );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE IF EXISTS group_link_t;');
  }
}
