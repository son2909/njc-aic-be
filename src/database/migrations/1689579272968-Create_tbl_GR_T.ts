import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTblGRT1689579272968 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS gr_t (
          id INT AUTO_INCREMENT PRIMARY KEY,
          mi_id INT,
          f_id INT,
          p_id INT,
receipt_int INT,
          num1 VARCHAR(30),
          record_identification_information VARCHAR(2),
          reason_for_calculation INT,
          dpc_code VARCHAR(14),
          created_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
          update_date DATETIME DEFAULT CURRENT_TIMESTAMP
      );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE IF EXISTS gr_t;');
  }
}
