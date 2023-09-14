import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTblPaymentFundMedicalDepartmentM1689229073700
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS payment_fund_medical_department_m (
          id INT AUTO_INCREMENT PRIMARY KEY,
          code INT UNIQUE NOT NULL,  
          content VARCHAR(100),
          created_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
          update_date DATETIME DEFAULT CURRENT_TIMESTAMP
      );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'DROP TABLE IF EXISTS payment_fund_medical_department_m;',
    );
  }
}
