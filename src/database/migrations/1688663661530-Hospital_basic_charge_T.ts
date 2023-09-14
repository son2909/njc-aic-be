import { MigrationInterface, QueryRunner } from 'typeorm';

export class HospitalBasicChargeT1688663661530 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS hospital_basic_charge_t (
            change_category INT,
            group_number INT,
            medical_practice_code INT PRIMARY KEY,
            abbreviated_name VARCHAR(64),
            addition_identification INT,
            spare INT,
            established_date INT,
            abolition_date INT,
            created_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            update_date DATETIME DEFAULT CURRENT_TIMESTAMP
        );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE IF EXISTS hospital_basic_charge_t;');
  }
}
