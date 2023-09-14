import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTblSYT1689579977844 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS sy_t (
          id INT AUTO_INCREMENT PRIMARY KEY,
          mi_id INT,
          f_id INT,
          p_id INT,
receipt_int INT,
          num1 VARCHAR(30),
          record_identification_information VARCHAR(2),
          injury_name_code INT,
          treatment_start_date INT,
          outcome_category INT,
          modifier_code VARCHAR(80),
          injury_name CHAR(40),
          main_injury INT,
          supplementary_comment CHAR(40),
          memo CHAR(100),
          created_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
          update_date DATETIME DEFAULT CURRENT_TIMESTAMP
      );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE IF EXISTS sy_t;');
  }
}
