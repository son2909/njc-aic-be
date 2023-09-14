import { MigrationInterface, QueryRunner } from 'typeorm';

export class PaymentFundMedicalDepartmentM1689040734833
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS medical_department_m (
          id INT PRIMARY KEY AUTO_INCREMENT,
          code INT NOT NULL UNIQUE,  
          content VARCHAR(100),
          created_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
          update_date DATETIME DEFAULT CURRENT_TIMESTAMP
      );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE IF EXISTS medical_department_m;');
  }
}
