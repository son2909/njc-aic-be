import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTblAppraisalInformationT1689778029891
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS appraisal_information_t (
            id INT AUTO_INCREMENT PRIMARY KEY,
            f_id INT NOT NULL,
            m_id INT NOT NULL,
            num_1 VARCHAR(30),
            medical_record_number INT NOT NULL,
            clinical_identification INT,
            receipt_no varchar(100) NULL,
            date_of_medical_treatment DATE NOT NULL,
            receipt_number INT,
            department_code INT,
            review_committee VARCHAR(100),
            item_type INT,
            insurer_number INT,
            elderly_municipal_number INT,
            payer_number_1 INT,
            payer_number_2 INT,
            payer_number_3 INT,
            payer_number_4 INT,
            division INT,
            burden_category VARCHAR(100),
            reason_job VARCHAR(100),
            exemption_category INT,
            family_name VARCHAR(100),
            point_1 VARCHAR(100),
            point_2 VARCHAR(100),
            legal_number INT,
            score_increase_decrease INT,
            reason VARCHAR(100),
            \`load\` VARCHAR(100),
            billing_summary VARCHAR(100) NOT NULL,
            post_assessment_burden VARCHAR(100),
            post_assessment_content VARCHAR(100) NOT NULL,
            search_number INT,
            billing_information  VARCHAR(100),
            doctor_id INT,
            doctor_name  VARCHAR(60),
            ward VARCHAR(60),
            date_medical_treatment DATE,
            sex VARCHAR(60),
            date_of_birth VARCHAR(60),
            insurance_benefit_ratio INT,
            report  VARCHAR(100),
            insurance  VARCHAR(60),
            memo  VARCHAR(300),
            created_date  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            update_date DATETIME DEFAULT CURRENT_TIMESTAMP,
            UNIQUE KEY appraisal_information_cs_unique (f_id, m_id, num_1, medical_record_number, clinical_identification)
      );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE IF EXISTS appraisal_information_t;');
  }
}
