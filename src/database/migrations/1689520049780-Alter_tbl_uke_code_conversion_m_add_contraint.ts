import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTblUkeCodeConversionMAddContraint1689520049780
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE uke_code_conversion_m ADD CONSTRAINT uke_code_conversion_m_constraint UNIQUE (main_code, code, content);`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE uke_code_conversion_m DROP CONSTRAINT uke_code_conversion_m_constraint;`,
    );
  }
}
