import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTblMFT1689987159013 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS mf_t (
            id INT AUTO_INCREMENT PRIMARY KEY,
            mi_id INT,
            f_id INT,
            p_id INT,
receipt_int INT,
            num1 VARCHAR(30),
            record_identification_information VARCHAR(2),
            window_burden_category INT,
            spare_1 INT,
            spare_2 INT,
            reserve_3 INT,
            spare_4 INT,
            spare_5 INT,
            spare_6 INT,
            spare_7 INT,
            spare_8 INT,
            spare_9 INT,
            spare_10 INT,
            spare_11 INT,
            spare_12 INT,
            spare_13 INT,
            spare_14 INT,
            spare_15 INT,
            spare_16 INT,
            spare_17 INT,
            spare_18 INT,
            spare_19 INT,
            spare_20 INT,
            spare_21 INT,
            spare_22 INT,
            spare_23 INT,
            spare_24 INT,
            spare_25 INT,
            spare_26 INT,
            spare_27 INT,
            spare_28 INT,
            spare_29 INT,
            spare_30 INT,
            spare_31 INT,
            created_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            update_date DATETIME DEFAULT CURRENT_TIMESTAMP
        );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE IF EXISTS mf_t;');
  }
}
