import { MigrationInterface, QueryRunner } from 'typeorm';

export class AbolishedMedicalPracticeM1689064781583
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS abolished_medical_practice_m (
            id INT PRIMARY KEY AUTO_INCREMENT,
            division VARCHAR(7),
            abbreviated_kanji_name VARCHAR(64),
            score_identification INT,
            points INT,
            abolition_date INT,
            medical_practice_code INT NOT NULL UNIQUE,               
            created_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            update_date DATETIME DEFAULT CURRENT_TIMESTAMP
        );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'DROP TABLE IF EXISTS abolished_medical_practice_m;',
    );
  }
}
