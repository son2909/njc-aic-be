import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTblDGRT1690200837301 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS d_gr_t (
        id INT AUTO_INCREMENT PRIMARY KEY,
        mi_id INT,
        f_id INT,
        p_id INT,
        receipt_int INT,
        num1 VARCHAR(30),
        identification_information VARCHAR(2),
        reason_for_calculation INT,
        dpc_code VARCHAR(14),
        discount_point_unit_price INT,
        spare_1 INT,
        spare_2 INT,
        spare_3 INT,
        comprehensive_receipt_category INT,
        number_of_item_information INT,
        search_number INT,
        spare_4 INT,
        billing_information VARCHAR(40),
        department_name INT,
        human_body_parts INT,
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
    await queryRunner.query('DROP TABLE IF EXISTS d_gr_t;');
  }
}
