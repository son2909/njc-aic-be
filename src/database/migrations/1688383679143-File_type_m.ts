import { MigrationInterface, QueryRunner } from 'typeorm';

export class FileTypeM1688383679143 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS file_type_m(
        file_type_id INT PRIMARY KEY AUTO_INCREMENT,
        content VARCHAR(100) NOT NULL,
        is_delivery INT,
        created_date DATETIME NOT NULL,
        updated_date DATETIME
      )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE IF EXISTS file_type_m;');
  }
}
