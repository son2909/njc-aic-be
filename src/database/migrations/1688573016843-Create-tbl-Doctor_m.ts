import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTblDoctorM1688573016843 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS doctor_m (
              id INT PRIMARY KEY AUTO_INCREMENT,
              mi_id INT,
              doctor_id INT NOT NULL UNIQUE,
              doctor_name VARCHAR(100),
              created_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
              updated_date DATETIME DEFAULT CURRENT_TIMESTAMP,
              UNIQUE KEY doctor_m_unique_doctor_id (doctor_id)
          );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE IF EXISTS doctor_m;');
  }
}
