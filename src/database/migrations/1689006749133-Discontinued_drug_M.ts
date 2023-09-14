import { MigrationInterface, QueryRunner } from 'typeorm';

export class DiscontinuedDrugM1689006749133 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS discontinued_drug_m (
            id INT PRIMARY KEY AUTO_INCREMENT,
            dosage_form INT,
            kanji_name VARCHAR(64),
            amount_type INT,
            amount_of_money INT,
            abolition_date INT,
            drug_code INT NOT NULL UNIQUE,
            created_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            update_date DATETIME DEFAULT CURRENT_TIMESTAMP
        );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE IF EXISTS discontinued_drug_m;');
  }
}
