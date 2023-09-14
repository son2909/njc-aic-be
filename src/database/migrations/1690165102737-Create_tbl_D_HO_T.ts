import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTblDHOT1690165102737 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS d_ho_t (
        id INT AUTO_INCREMENT PRIMARY KEY,
        mi_id INT,
        f_id INT,
        p_id INT,
        receipt_int INT,
        num1 VARCHAR(30),
        identification_information VARCHAR(2),
        insurer_number VARCHAR(8),
        symbol VARCHAR(38),
        number VARCHAR(38),
        actual_days_of_medical_treatment INT,
        total_score INT,
        spare INT,
        number_of_times INT,
        total_amount INT,
        reason INT,
        certificate_number INT,
        medical_insurance INT,
        exemption_category INT,
        reduction_rate INT,
        reduction_amount INT,
        burden_amount INT,
        created_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        update_date DATETIME DEFAULT CURRENT_TIMESTAMP
      );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE IF EXISTS d_ho_t;');
  }
}
