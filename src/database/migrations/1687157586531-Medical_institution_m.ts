import { MigrationInterface, QueryRunner } from 'typeorm';

export class MedicalInstitutionM1687157586531 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`medical_institution_m\` (
        \`mi_id\` int NOT NULL AUTO_INCREMENT,
        \`medical_institution_name\` varchar(100) NOT NULL,
        \`officer_name\` varchar(60) NOT NULL,
        \`created_date\` datetime NOT NULL,
        \`update_date\` datetime NOT NULL,
        PRIMARY KEY (\`mi_id\`)
      )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE IF EXISTS proposal_management_t;');
  }
}
