import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTblDIYT1690202399853 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS d_iy_t (
        id INT AUTO_INCREMENT PRIMARY KEY,
        mi_id INT,
        f_id INT,
        p_id INT,
        receipt_int INT,
        num1 VARCHAR(30),
        num2 VARCHAR(30),
        identification_information VARCHAR(2),
        clinical_identification INT,
        burden_category VARCHAR(1),
        drug_code INT,
        amount_to_use INT,
        score INT,
        number_of_times INT,
        comment_code_1 INT,
        character_data_1 CHAR(100),
        comment_code_2 INT,
        character_data_2 CHAR(100),
        comment_code_3 INT,
        character_data_3 CHAR(100),
        calculation_date_1 INT,
        calculation_date_2 INT,
        calculation_date_3 INT,
        calculation_date_4 INT,
        calculation_date_5 INT,
        calculation_date_6 INT,
        calculation_date_7 INT,
        calculation_date_8 INT,
        calculation_date_9 INT,
        calculation_date_10 INT,
        calculation_date_11 INT,
        calculation_date_12 INT,
        calculation_date_13 INT,
        calculation_date_14 INT,
        calculation_date_15 INT,
        calculation_date_16 INT,
        calculation_date_17 INT,
        calculation_date_18 INT,
        calculation_date_19 INT,
        calculation_date_20 INT,
        calculation_date_21 INT,
        calculation_date_22 INT,
        calculation_date_23 INT,
        calculation_date_24 INT,
        calculation_date_25 INT,
        calculation_date_26 INT,
        calculation_date_27 INT,
        calculation_date_28 INT,
        calculation_date_29 INT,
        calculation_date_30 INT,
        calculation_date_31 INT,
        memo CHAR(100),
        created_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        update_date DATETIME DEFAULT CURRENT_TIMESTAMP
    );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE IF EXISTS d_iy_t;');
  }
}
