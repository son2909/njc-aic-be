import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTblDKKT1690201637499 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS d_kk_t (
        id INT AUTO_INCREMENT PRIMARY KEY,
        mi_id INT,
        f_id INT,
        p_id INT,
        receipt_int INT,
        num1 VARCHAR(30),
        identification_information VARCHAR(2),
        spare_1 INT,
        ward_transfer_presence INT,
        division INT,
        discharge_date INT,
        hospitalization_presence INT,
        age INT,
        body_weight INT,
        jcs INT,
        spare_2 INT,
        burn_index INT,
        severity VARCHAR(100),
        reserve_3 INT,
        spare_4 INT,
        weeks_of_pregnancy INT,
        delivery_bleeding INT,
        created_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        update_date DATETIME DEFAULT CURRENT_TIMESTAMP
    );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE IF EXISTS d_kk_t;');
  }
}
