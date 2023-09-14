import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTblDCOT1690200709292 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS d_co_t (
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
        comment_code INT,
        character_data VARCHAR(76),
        memo CHAR(100),
        created_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        update_date DATETIME DEFAULT CURRENT_TIMESTAMP
    );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE IF EXISTS d_co_t;');
  }
}
