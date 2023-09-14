import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTbleHospitalBasicChargeTAddContraint1689236289246
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE hospital_basic_charge_t ADD CONSTRAINT hospital_basic_charge_t_constraint UNIQUE (medical_practice_code, group_number);`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE hospital_basic_charge_t DROP CONSTRAINT hospital_basic_charge_t_constraint;`,
    );
  }
}
