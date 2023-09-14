import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTblDGTT1690202037215 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS d_gt_t (
        id INT AUTO_INCREMENT PRIMARY KEY,
        mi_id INT,
        f_id INT,
        p_id INT,
        receipt_int INT,
        num1 VARCHAR(30),
        num2 VARCHAR(30),
        identification_information VARCHAR(2),
        date_of_medical_treatment INT,
        adjustment_category INT,
        insurance_category INT,
        burden_category VARCHAR(1),
        sum_of_subtotal_points INT,
        evaluation_score INT,
        number_of_adjustment_points INT,
        this_month_total_score INT,
        clinical_identification INT,
        insurance_change_date INT,
        character_data CHAR(40),
        created_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        update_date DATETIME DEFAULT CURRENT_TIMESTAMP
    );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE IF EXISTS d_gt_t;');
  }
}
