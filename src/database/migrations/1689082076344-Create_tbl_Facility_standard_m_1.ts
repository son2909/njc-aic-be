import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTblFacilityStandardM11689082076344
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS facility_standard_m_1 (
            id INT PRIMARY KEY AUTO_INCREMENT,
            facility_standard_code INT NOT NULL UNIQUE,
            facility_standard_name VARCHAR(1000),
            facility_standard_abbreviation VARCHAR(1000),
            compatible_receipt_computer_code INT,
            revision_year INT, 
            created_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            update_date DATETIME DEFAULT CURRENT_TIMESTAMP
        );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE IF EXISTS facility_standard_m_1;');
  }
}
