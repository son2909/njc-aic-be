import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTblHOT1689575231644 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS ho_t (
          id INT AUTO_INCREMENT PRIMARY KEY,
          mi_id INT,
          f_id INT,
          p_id INT,
receipt_int INT,
          num1 VARCHAR(30),
          record_identification_information VARCHAR(2),
          insurer_int VARCHAR(8),
          insurance_card_symbol VARCHAR(38),
          insurance_card_int VARCHAR(38),
          actual_days_of_medical_treatment INT,
          total_score INT,
          spare INT,
          int_of_treatments INT,
          total_amount_of_medical_treatment INT,
          professional_reasons INT,
          certificate_int INT,
          medical_insurance INT,
          exemption_category INT,
          reduction_rate INT,
          reduction_amount INT,
          created_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
          update_date DATETIME DEFAULT CURRENT_TIMESTAMP
      );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE IF EXISTS ho_t;');
  }
}
