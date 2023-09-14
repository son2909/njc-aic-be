import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTblChatConnectedManagementT1691173903034
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS chat_session_management_t (
                id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                connected_id VARCHAR(45) NOT NULL,
                account_id INT NOT NULL,
                connected_time DATETIME NULL,
                status TINYINT NULL DEFAULT 1
            );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE IF EXISTS chat_session_management_t;');
  }
}
