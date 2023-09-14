import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTblChatManagementT1691164941887
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS chat_management_t (
                id INT AUTO_INCREMENT PRIMARY KEY,
                group_id INT(10) NOT NULL COMMENT 'グループID\n',
                account_id INT(10) NULL COMMENT 'アカウントID\n',
                name NVARCHAR(30) NULL COMMENT '名前\n',
                comment NVARCHAR(100) NULL COMMENT 'コメント内容\n',
                p_id INT(16) NULL COMMENT '患者ID\n',
                created_date DATETIME NOT NULL COMMENT 'レコード作成日\n',
                update_date DATETIME NULL COMMENT 'レコード更新日\n'
            );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE IF EXISTS chat_management_t;');
  }
}
