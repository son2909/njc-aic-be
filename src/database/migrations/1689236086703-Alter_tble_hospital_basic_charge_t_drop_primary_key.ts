import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTbleHospitalBasicChargeTDropPrimaryKey1689236086703
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE hospital_basic_charge_t DROP PRIMARY KEY;`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE hospital_basic_charge_t MODIFY medical_practice_code INT NOT NULL PRIMARY KEY;`,
    );
  }
}
