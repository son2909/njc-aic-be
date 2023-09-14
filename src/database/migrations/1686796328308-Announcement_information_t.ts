import { MigrationInterface, QueryRunner } from 'typeorm';

export class AnnouncementInformationT1686796328308
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS \`announcement_information_t\` (
        \`announcement_id\` int(10) NOT NULL AUTO_INCREMENT,
        \`title\` varchar(50) NOT NULL,
        \`content\` varchar(300) NOT NULL,
        \`date\` date NOT NULL,
        \`display_expiration_date\` date NOT NULL,
        \`display_code_1\` int(1) DEFAULT NULL,
        \`display_code_2\` int(1) DEFAULT NULL,
        \`display_code_3\` int(1) DEFAULT NULL,
        \`display_code_4\` int(1) DEFAULT NULL,
        \`display_code_5\` int(1) DEFAULT NULL,
        \`record_creation_date\` datetime NOT NULL,
        \`record_update_date\` datetime DEFAULT NULL,
        PRIMARY KEY (\`announcement_id\`)
      )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE IF EXISTS announcement_information_t;');
  }
}
