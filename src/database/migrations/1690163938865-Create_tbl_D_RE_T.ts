import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTblDRET1690163938865 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS d_re_t (
          id INT AUTO_INCREMENT PRIMARY KEY,
          mi_id INT,
          f_id INT,
          p_id INT,
          num1 VARCHAR(30),
          identification_information VARCHAR(2),
          receipt_number INT,
          receipt_type VARCHAR(6),
          date_of_medical_treatment INT,
          family_name VARCHAR(40),
          gender_classification INT,
          date_of_birth INT,
          benefit_ratio INT,
          date_of_hospitalization INT,
          ward_classification VARCHAR(8),
          burden_category INT,
          receipt_special_notes VARCHAR(10),
          spare_1 INT,
          medical_record_number VARCHAR(20),
          discount_point_unit_price INT,
          spare_2 INT,
          spare_3 INT,
          spare_4 INT,
          comprehensive_receipt_category INT,
          number_of_item_information INT,
          search_number INT,
          spare INT,
          billing_information VARCHAR(40),
          department_name INT,
          human_body_part INT,
          sex INT,
          treatment INT,
          specified_disease INT,
          kana_name CHAR(80),
          patient_condition INT,
          created_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
          update_date DATETIME DEFAULT CURRENT_TIMESTAMP
      );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE IF EXISTS d_re_t;');
  }
}
