import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTblUKECodeConversionM1689487911833
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS uke_code_conversion_m (
        id INT AUTO_INCREMENT PRIMARY KEY,
        main_code INT,
        code_name VARCHAR(60),
        code VARCHAR(6),
        content VARCHAR(100),
        created_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        update_date DATETIME DEFAULT CURRENT_TIMESTAMP
    );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE IF EXISTS uke_code_conversion_m;');
  }
}
