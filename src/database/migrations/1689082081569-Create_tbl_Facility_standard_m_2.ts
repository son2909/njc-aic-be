import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTblFacilityStandardM21689082081569
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS facility_standard_m_2 (
              id INT PRIMARY KEY AUTO_INCREMENT,
              facility_standard_code INT NOT NULL UNIQUE,
              acquired INT,
              revision_year INT, 
              created_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
              update_date DATETIME DEFAULT CURRENT_TIMESTAMP
          );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE IF EXISTS facility_standard_m_2;');
  }
}
