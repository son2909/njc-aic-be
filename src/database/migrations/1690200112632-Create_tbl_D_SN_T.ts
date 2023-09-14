import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTblDSNT1690200112632 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS d_sn_t (
        id INT AUTO_INCREMENT PRIMARY KEY,
        mi_id INT,
        f_id INT,
        p_id INT,
        receipt_int INT,
        num1 VARCHAR(30),
        identification_information VARCHAR(2),
        payer_type INT,
        confirmation_category INT,
        insurer_number VARCHAR(8),
        symbol VARCHAR(38),
        number VARCHAR(38),
        branch_number VARCHAR(2),
        beneficiary_number INT,
        spare INT,
        created_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        update_date DATETIME DEFAULT CURRENT_TIMESTAMP
    );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE IF EXISTS d_sn_t;');
  }
}
