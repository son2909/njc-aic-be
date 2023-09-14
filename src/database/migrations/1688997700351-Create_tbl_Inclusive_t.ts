import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTblInclusiveT1688997700351 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS inclusive_t (
            ID INT PRIMARY KEY AUTO_INCREMENT,
            change_category INT,
            group_number VARCHAR(7),
            medical_practice_code INT NOT NULL UNIQUE,
            abbreviated_name VARCHAR(64),
            special_conditions INT,
            established_date INT,
            abolition_date INT,
            created_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            update_date DATETIME DEFAULT CURRENT_TIMESTAMP
          );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE IF EXISTS inclusive_t;');
  }
}
