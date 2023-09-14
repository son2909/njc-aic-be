import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTbleHospitalBasicChargeTAddColumnIdPk1689236216016
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE hospital_basic_charge_t ADD COLUMN id INT AUTO_INCREMENT PRIMARY KEY;`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE hospital_basic_charge_t DROP COLUMN id;`,
    );
  }
}
