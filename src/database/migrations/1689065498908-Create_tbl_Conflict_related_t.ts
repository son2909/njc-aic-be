import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTblConflictRelatedT1689065498908
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS conflict_related_t (
            id INT PRIMARY KEY AUTO_INCREMENT,
            change_category INT,
            medical_practice_code_1 INT NOT NULL UNIQUE,
            abbreviated_name_1 VARCHAR(64),
            medical_practice_code_2 INT,
            abbreviated_name_2 VARCHAR(64),
            contradictory_classification INT,
            special_conditions INT,
            spare INT,
            established_date INT,
            abolition_date INT,
            created_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            update_date DATETIME DEFAULT CURRENT_TIMESTAMP
        );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE IF EXISTS conflict_related_t;');
  }
}
