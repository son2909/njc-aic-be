import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTblGeneralDrugNameM1688653346258
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS general_drug_name_m (
        id INT PRIMARY KEY AUTO_INCREMENT,
        division VARCHAR(100),
        common_name_code VARCHAR(100) NOT NULL UNIQUE,
        generic_name_prescription VARCHAR(100),
        ingredient_name VARCHAR(100),
        standard VARCHAR(100),
        addition_target VARCHAR(100),
        exception_code VARCHAR(100),
        lowest_drug_price double,
        remarks VARCHAR(100),
        created_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        update_date DATETIME DEFAULT CURRENT_TIMESTAMP
        );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE IF EXISTS general_drug_name_M;');
  }
}
