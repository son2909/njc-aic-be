import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTblModifierM1689256611225 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS modifier_m (
            id INT AUTO_INCREMENT PRIMARY KEY,
            change_category INT,
            master_type VARCHAR(1),
            code INT UNIQUE NOT NULL,
            spare_1 INT,
            spare_2 INT,
            number_of_digits INT,
            name VARCHAR(40),
            spare_3 VARCHAR(24),
            kana_name_digits INT,
            kana_name VARCHAR(60),
            spare_4 INT,
            change_of_name INT,
            kana_name_change INT,
            listing_date  INT,
            date_of_change  INT,
            abolition_date INT,
            control_number INT,
            exchange_code VARCHAR(9),
            division VARCHAR(8),
            created_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            update_date DATETIME DEFAULT CURRENT_TIMESTAMP
        );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE IF EXISTS modifier_m;');
  }
}
