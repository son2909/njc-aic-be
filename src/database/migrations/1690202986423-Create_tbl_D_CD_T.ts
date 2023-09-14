import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTblDCDT1690202986423 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS d_cd_t (
        id INT AUTO_INCREMENT PRIMARY KEY,
        mi_id INT,
        f_id INT,
        p_id INT,
        receipt_int INT,
        num1 VARCHAR(30),
        num2 VARCHAR(30),
        identification_information VARCHAR(2),
        implementation_date INT,
        clinical_identification INT,
        sequence_number INT,
        action_item_number INT,
        system_code INT,
        amount_to_use INT,
        quantity_data INT,
        unit_code INT,
        number_of_times INT,
        spare CHAR(254),
        memo CHAR(100),
        created_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        update_date DATETIME DEFAULT CURRENT_TIMESTAMP
    );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE IF EXISTS d_cd_t;');
  }
}
