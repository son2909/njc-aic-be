import { MigrationInterface, QueryRunner } from 'typeorm';

export class NumberOfCalculationsT1688666858128 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS number_of_calculations_t (
            change_category INT,
            medical_practice_code INT PRIMARY KEY,
            abbreviated_name VARCHAR(64),
            unit_of_measure_code INT,
            accounting_unit_name VARCHAR(12),
            number_of_calculations INT,
            special_conditions INT,
            spare_1 INT,
            spare_2 INT,
            spare_3 INT,
            spare_4 INT,
            spare_5 INT,
            established_date INT,
            abolition_date INT,
            created_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            update_date DATETIME DEFAULT CURRENT_TIMESTAMP
        );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE IF EXISTS number_of_calculations_t;');
  }
}
