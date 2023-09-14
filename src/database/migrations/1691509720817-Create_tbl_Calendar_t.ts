import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTblCalendarT1691509720817 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS calendar_t (
            id INT PRIMARY KEY AUTO_INCREMENT,
            account_id INT NOT NULL,
            account_classification INT NOT NULL,
            display_code_1 INT,
            display_code_2 INT,
            display_code_3 INT,
            display_code_4 INT,
            display_code_5 INT,
            registration_date DATE NOT NULL,
            title VARCHAR(50) NOT NULL,
            content VARCHAR(300), 
            start_date DATE NOT NULL,
            end_date DATE NOT NULL,
            start_time INT,
            ending_time INT,
            created_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            update_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP    
        );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE IF EXISTS calendar_t;');
  }
}
