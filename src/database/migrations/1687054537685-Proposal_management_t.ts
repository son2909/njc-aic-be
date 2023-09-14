import { MigrationInterface, QueryRunner } from 'typeorm';

export class ProposalManagementT1687054537685 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`proposal_management_t\` (
        \`proposal_id\` int NOT NULL AUTO_INCREMENT,
        \`group_id\` int,
        \`account_id\` int NOT NULL,
        \`mi_id\` int,
        \`title\` varchar(100) NOT NULL,
        \`proposal_content\` varchar(300) NOT NULL,
        \`proposal_date\` DATE,
        \`point\` int,
        \`adoption_flag\` int,
        \`created_date\` DATETIME NOT NULL,
        \`update_date\` DATETIME,
        PRIMARY KEY (\`proposal_id\`)
      )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE IF EXISTS proposal_management_t;');
  }
}
