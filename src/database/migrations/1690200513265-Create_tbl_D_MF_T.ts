import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTblDMFT1690200513265 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS d_mf_t (
        id INT AUTO_INCREMENT PRIMARY KEY,
        mi_id INT,
        f_id INT,
        p_id INT,
        receipt_int INT,
        num1 VARCHAR(30),
        identification_information VARCHAR(2),
        window_burden_category INT,
        spare_1 INT,
        spare_2 INT,
        reserve_3 INT,
        reserve_4 INT,
        reserve_5 INT,
        reserve_6 INT,
        reserve_7 INT,
        reserve_8 INT,
        reserve_9 INT,
        reserve_10 INT,
        reserve_11 INT,
        reserve_12 INT,
        reserve_13 INT,
        reserve_14 INT,
        reserve_15 INT,
        reserve_16 INT,
        reserve_17 INT,
        reserve_18 INT,
        reserve_19 INT,
        reserve_20 INT,
        reserve_21 INT,
        reserve_22 INT,
        reserve_23 INT,
        reserve_24 INT,
        reserve_25 INT,
        reserve_26 INT,
        reserve_27 INT,
        reserve_28 INT,
        spare_29 INT,
        spare_30 INT,
        spare_31 INT,
        created_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        update_date DATETIME DEFAULT CURRENT_TIMESTAMP
    );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE IF EXISTS d_mf_t;');
  }
}
