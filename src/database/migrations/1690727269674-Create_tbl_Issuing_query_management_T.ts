import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTblIssuingQueryManagementT1690727269674
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS issuing_query_management_t (
              query_id INT AUTO_INCREMENT PRIMARY KEY,
              query_content VARCHAR(300) NOT NULL,
              execute_query VARCHAR(1000) NOT NULL,
              query_last_run_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
              created_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
              update_date DATETIME DEFAULT CURRENT_TIMESTAMP
              );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE IF EXISTS issuing_query_management_t;');
  }
}
