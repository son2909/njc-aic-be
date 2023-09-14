import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTblRET1689523458731 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS re_t (
        id INT AUTO_INCREMENT PRIMARY KEY,
        mi_id INT,
        f_id INT,
        p_id INT,
        num1 VARCHAR(30),
        iden VARCHAR(2),
        receipt_int INT,
        receipt_type VARCHAR(6),
        date_of_medical_treatment INT,
        name VARCHAR(40),
        gender_classification INT,
        date_of_birth INT,
        benefit_ratio INT,
        date_of_hospitalization INT,
        ward_classification VARCHAR(8),
        standard_burden_category INT,
        receiptsn VARCHAR(10),
        int_of_beds INT,
        mrint VARCHAR(20),
        dpprice INT,
        spare1 INT,
        spare2 INT,
        spare3 INT,
        searchint INT,
        spare4 INT,
        billinfo VARCHAR(40),
        dname1 INT,
        human_body_parts_1 INT,
        gender_etc_1 INT,
        medical_procedure_1 INT,
        specified_disease_1 INT,
        department_name_2 INT,
        human_body_part_2 INT,
        gender_etc_2 INT,
        medical_procedure_2 INT,
        specified_disease_2 INT,
        department_name_3 INT,
        human_body_part_3 INT,
        gender_etc_3 INT,
        medical_procedure_3 INT,
        specified_disease_3 INT,
        kana_name CHAR(80),
        patient_condition INT,
        created_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        update_date DATETIME DEFAULT CURRENT_TIMESTAMP
    );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE IF EXISTS re_t;');
  }
}
