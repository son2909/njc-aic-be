import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTblDHHT1690201897644 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS d_hh_t (
        id INT AUTO_INCREMENT PRIMARY KEY,
        mi_id INT,
        f_id INT,
        p_id INT,
        receipt_int INT,
        num1 VARCHAR(30),
        identification_information VARCHAR(2),
        date_of_medical_treatment INT,
        adjustment_category INT,
        insurance_category INT,
        burden_category VARCHAR(1),
        division INT,
        score INT,
        hospitalization_days INT,
        number_of_subtotals INT,
        created_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        update_date DATETIME DEFAULT CURRENT_TIMESTAMP
    );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE IF EXISTS d_hh_t;');
  }
}
