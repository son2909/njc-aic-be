import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTblAuxiliaryT1689001765422 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS auxiliary_t (
            id INT PRIMARY KEY AUTO_INCREMENT,
            change_category INT,
            medical_practice_code INT NOT NULL UNIQUE,
            abbreviated_name VARCHAR(64),
            inclusive_unit_1 INT,
            group_number_1 VARCHAR(7),
            inclusive_unit_2 INT,
            group_number_2 VARCHAR(7),
            inclusive_unit_3 INT,
            group_number_3 VARCHAR(7),
            1_day INT,
            within_the_same_month INT,
            simultaneous INT,
            1_week INT,
            spare_1 INT,
            spare_2 INT,
            reserve_3 INT,
            spare_4 VARCHAR(12),
            spare_5 INT,
            reserve_6 INT,
            hospital_fee_identification INT,
            number_of_calculations INT,
            spare_7 INT,
            spare_8 INT,
            spare_9 INT,
            spare_10 INT,
            established_date INT,
            abolition_date INT,
            created_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            update_date DATETIME DEFAULT CURRENT_TIMESTAMP
        );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE IF EXISTS auxiliary_t;');
  }
}
