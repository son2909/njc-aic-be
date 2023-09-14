import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTblJDT1689578647319 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS jd_t (
          id INT AUTO_INCREMENT PRIMARY KEY,
          mi_id INT,
          f_id INT,
          p_id INT,
receipt_int INT,
          num1 VARCHAR(30),
          record_identification_information VARCHAR(2),
          payer_type INT,
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
          created_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
          update_date DATETIME DEFAULT CURRENT_TIMESTAMP
      );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE IF EXISTS jd_t;');
  }
}
