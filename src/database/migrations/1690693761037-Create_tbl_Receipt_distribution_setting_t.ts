import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTblReceiptDistributionSettingT1690693761037
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS receipt_distribution_setting_t (
            setting_id INT PRIMARY KEY AUTO_INCREMENT,
            p_id INT,
            mi_id INT,
            medical_and_dental INT,
            inpatient_outpatient INT,
            social_insurance_national_insurance INT,
            date_of_medical_treatment DATE,
            clinical_department INT,
            presence_or_absence_of_errors INT,
            more_than_the_corresponding_score_flag INT,
            flag_below_the_score INT,
            account_id INT NOT NULL,
            created_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, 
            update_date DATETIME DEFAULT CURRENT_TIMESTAMP
        );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'DROP TABLE IF EXISTS receipt_distribution_setting_t;',
    );
  }
}
