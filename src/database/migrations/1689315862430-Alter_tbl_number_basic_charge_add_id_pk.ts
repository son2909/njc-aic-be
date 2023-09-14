import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTblNumberBasicChargeAddIdPk1689315862430
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await Promise.all([
      queryRunner.query(
        `ALTER TABLE number_of_calculations_t DROP PRIMARY KEY;`,
      ),
      queryRunner.query(
        `ALTER TABLE number_of_calculations_t ADD COLUMN id INT AUTO_INCREMENT PRIMARY KEY;`,
      ),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await Promise.all([
      queryRunner.query(`ALTER TABLE number_of_calculations_t DROP COLUMN id;`),
      queryRunner.query(
        `ALTER TABLE number_of_calculations_t MODIFY medical_practice_code INT NOT NULL PRIMARY KEY;`,
      ),
    ]);
  }
}
