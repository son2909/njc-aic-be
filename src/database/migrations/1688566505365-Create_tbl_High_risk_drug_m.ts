import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTblHighRiskDrugM1688566505365 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS high_risk_drug_m (
            id INT PRIMARY KEY AUTO_INCREMENT,
            drug_code INT NOT NULL UNIQUE,
            kanji_name VARCHAR(100),
            kana_name VARCHAR(100),
            dosage_form VARCHAR(100),
            drug_price_standard_code VARCHAR(50),
            basic_kanji_name VARCHAR(100),
            created_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_date DATETIME DEFAULT CURRENT_TIMESTAMP
        );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE IF EXISTS high_risk_drug_m;');
  }
}
