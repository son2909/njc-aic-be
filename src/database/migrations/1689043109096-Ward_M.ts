import { MigrationInterface, QueryRunner } from 'typeorm';

export class WardM1689043109096 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS ward_m (
          id INT PRIMARY KEY AUTO_INCREMENT,
          ward_code INT NOT NULL UNIQUE,  
          ward_name VARCHAR(100),
          created_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
          update_date DATETIME DEFAULT CURRENT_TIMESTAMP
      );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE IF EXISTS ward_m;');
  }
}
