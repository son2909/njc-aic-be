import { MigrationInterface, QueryRunner } from 'typeorm';

export class FileManagementT1688383300112 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS file_mamagement_t(
            file_id INT PRIMARY KEY AUTO_INCREMENT,
            file_name VARCHAR(100) NOT NULL,
            mi_id INT,
            file_division INT NOT NULL,
            file_type_id INT NOT NULL,
            upload_date DATE NOT NULL,
            account_id INT NOT NULL,
            total_number INT NOT NULL,
            created_date DATETIME NOT NULL,
            updated_date DATETIME
        )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE IF EXISTS file_mamagement_t;');
  }
}
