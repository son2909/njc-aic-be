import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTblDIRT1690124225016 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS d_ir_t (
        id INT AUTO_INCREMENT PRIMARY KEY,
        mi_id INT,
        f_id INT,
        num1 VARCHAR(30),
        identification_information VARCHAR(2),
        examination_payment_agency INT,
        prefectures INT,
        score_table INT,
        medical_institution_code INT,
        spare INT,
        medical_institution_name VARCHAR(40),
        billing_date INT,
        multi_volume_identification_information INT,
        telephone_number VARCHAR(15),
        created_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        update_date DATETIME DEFAULT CURRENT_TIMESTAMP
      );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE IF EXISTS d_ir_t;');
  }
}
