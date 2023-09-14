import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTblDKOT1690199853640 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS d_ko_t (
        id INT AUTO_INCREMENT PRIMARY KEY,
        mi_id INT,
        f_id INT,
        p_id INT,
        receipt_int INT,
        num1 VARCHAR(30),
        identification_information VARCHAR(2),
        bearer_number VARCHAR(8),
        beneficiary_number INT,
        benefit_category INT,
        actual_days_of_medical_treatment INT,
        total_score INT,
        public_expense INT,
        spare_1 INT,
        contribution INT,
        spare_2 INT,
        number_of_times INT,
        total_amount INT,
        standard_burden_amount INT,
        created_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        update_date DATETIME DEFAULT CURRENT_TIMESTAMP
    );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE IF EXISTS d_ko_t;');
  }
}
