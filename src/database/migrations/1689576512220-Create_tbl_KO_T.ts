import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTblKOT1689576512220 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS ko_t (
          id INT AUTO_INCREMENT PRIMARY KEY,
          mi_id INT,
          f_id INT,
          p_id INT,
receipt_int INT,
          num1 VARCHAR(30),
          record_identification_information VARCHAR(2),
          bearer_number VARCHAR(8),
          beneficiary_number INT,
          benefit_category INT,
          actual_days INT,
          total_score INT,
          burden_amount INT,
          outpatient_copayment INT,
          hospital_copayment INT,
          spare INT,
          number_treatments INT,
          total_amount_of_medical_treatment INT,
          created_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
          update_date DATETIME DEFAULT CURRENT_TIMESTAMP
      );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE IF EXISTS ko_t;');
  }
}
