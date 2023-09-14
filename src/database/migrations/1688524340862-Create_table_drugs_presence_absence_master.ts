import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableDrugsPresenceAbsenceMaster1688524340862
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS drugs_presence_absence_master (
          id INT AUTO_INCREMENT PRIMARY KEY,
          drug_code VARCHAR(50),
          ingredient_name VARCHAR(50),
          product_name VARCHAR(50),
          information_of_generic_drugs VARCHAR(50),
          listing_date DATETIME,
          expire_date_transitional VARCHAR(50),
          remarks VARCHAR(50),
          items_excluded_calculation VARCHAR(50),
          record_creation_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
          record_update_date DATETIME DEFAULT CURRENT_TIMESTAMP
      );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'DROP TABLE IF EXISTS drugs_presence_absence_master;',
    );
  }
}
