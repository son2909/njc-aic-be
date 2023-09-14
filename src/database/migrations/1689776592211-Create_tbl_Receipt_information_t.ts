import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTblReceiptInformationT1689776592211
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS receipt_information_t (
            id INT PRIMARY KEY AUTO_INCREMENT,
            mi_id INT NOT NULL,
            f_id INT NOT NULL,
            p_id INT NOT NULL,
            error_f_id INT NOT NULL,
            satei_f_id INT,
            file_division INT NOT NULL,
            receipt_type INT NOT NULL,
            doctor_name VARCHAR(20),
            doctor_id INT,
            account_id INT,
            group_id INT,
            account_id2 INT,
            invoice_id INT,
            clinical_department VARCHAR(20) NOT NULL,
            total_score INT NOT NULL,
            medical_dpc_flag INT,
            medical_dental_flag INT NOT NULL,
            inpatient_outpatient_flag INT NOT NULL,
            social_national_flag INT NOT NULL,
            return_destination INT NOT NULL,
            error_flag INT NOT NULL,
            acknowledgment_flag INT NOT NULL,
            allocation_status_flag INT NOT NULL,
            status_check_flag INT NOT NULL,
            print_status_flag INT NOT NULL,
            delivery_status_flag INT NOT NULL,
            data_received_date DATE NOT NULL,
            billing_date DATE NOT NULL,
            date_of_medical_treatment DATE NOT NULL,
            deadline_for_inspection DATE,
            inspection_completion_date DATE,
            inspection_time INT,
            delivery_deadline DATE NOT NULL,
            delivery_completion_date DATE,
            assessment_flag INT NOT NULL,
            delayed_delivery_flag INT NOT NULL,
            Inspection_incomplete_flag INT NOT NULL,
            note_contents VARCHAR(300),
            error1 VARCHAR(300),
            error2 VARCHAR(100),
            error3 VARCHAR(100),
            error4 VARCHAR(100),
            error5 VARCHAR(100),
            error6 VARCHAR(100),
            error7 VARCHAR(100),
            error8 VARCHAR(100),
            error9 VARCHAR(100),
            error10 VARCHAR(100),
            error11 VARCHAR(100),
            error12 VARCHAR(100),
            error13 VARCHAR(100),
            error14 VARCHAR(100),
            error15 VARCHAR(100),
            error16 VARCHAR(100),
            error17 VARCHAR(100),
            error18 VARCHAR(100),
            error19 VARCHAR(100),
            error20 VARCHAR(100),
            created_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            update_date DATETIME DEFAULT CURRENT_TIMESTAMP
      );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE IF EXISTS receipt_information_t;');
  }
}
