import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTblNumberOfCalculationAddContraint1689521365093
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE number_of_calculations_t ADD CONSTRAINT number_of_calculations_t_constraint UNIQUE (medical_practice_code, unit_of_measure_code);`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE number_of_calculations_t DROP CONSTRAINT number_of_calculations_t_constraint;`,
    );
  }
}
