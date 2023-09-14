import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTblAlertT1688791017265 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS alert_t (
            alert_id INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(50) NOT NULL,
            content VARCHAR(300) NOT NULL,
            date DATE,
            display_expiration_date DATE,
            display_code_1 INT,
            display_code_2 INT,
            display_code_3 INT,
            display_code_4 INT,
            display_code_5 INT,
            created_date DATETIME,
            update_date DATETIME
        );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE IF EXISTS alert_t;');
  }
}
