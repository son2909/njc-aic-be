import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTblAppraisalConditionSetting1692972566455
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS appraisal_condition_setting_t (
            setting_id INT PRIMARY KEY AUTO_INCREMENT,
            mi_id INT,
            start_month INT,
            end_month INT,
            clinical_department VARCHAR(30),
            doctor_name VARCHAR(30),
            examination_payment_agency VARCHAR(8),
            identification_info VARCHAR(4),
            clinical_identification VARCHAR(4),
            assessment_reason VARCHAR(500),
            computer_code INT,
            created_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            update_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP    
          );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'DROP TABLE IF EXISTS appraisal_condition_setting_t;',
    );
  }
}
