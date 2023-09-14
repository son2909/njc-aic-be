import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTblMessageT1690727203453 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS message_t (
              message_id INT AUTO_INCREMENT PRIMARY KEY,
              mi_id INT,
              converted_content VARCHAR(80) NOT NULL,
              errer_level INT,
              created_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
              update_date DATETIME DEFAULT CURRENT_TIMESTAMP
              );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE IF EXISTS message_t;');
  }
}
