import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTblDSBT1690201238553 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS d_sb_t (
        id INT AUTO_INCREMENT PRIMARY KEY,
        mi_id INT,
        f_id INT,
        p_id INT,
        receipt_int INT,
        num1 VARCHAR(30),
        identification_information VARCHAR(2),
        injury_name_code INT,
        modifier_code VARCHAR(80),
        injury_name CHAR(40),
        icd10_code VARCHAR(5),
        injury_name_classification INT,
        cause_of_death INT,
        supplement CHAR(40),
        created_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        update_date DATETIME DEFAULT CURRENT_TIMESTAMP
    );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE IF EXISTS d_sb_t;');
  }
}
