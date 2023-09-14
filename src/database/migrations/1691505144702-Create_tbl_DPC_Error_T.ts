import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTblDPCErrorT1691505144702 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS dpc_error_t (
        id INT AUTO_INCREMENT PRIMARY KEY,
        mi_id INT,
        f_id INT,
        p_id INT,
        hidden INT,
        error_contents_update VARCHAR(255),
        date_of_medical_treatment VARCHAR(10),
        national_insurance_social_insurance VARCHAR(10),
        entry_exit_classification VARCHAR(10),
        receipt_type VARCHAR(6),
        clinical_department VARCHAR(60),
        ward_name VARCHAR(30),
        doctor_name VARCHAR(30),
        medical_record_number INT,
        patient_name VARCHAR(60),
        error_code VARCHAR(10),
        error_contents VARCHAR(255),
        target_code VARCHAR(10),
        target_code_name VARCHAR(100),
        icd10_code VARCHAR(10),
        actual_score INT,
        calculation_result INT,
        department_2 VARCHAR(100),
        department_3 VARCHAR(100),
        arbitrary_name_1 VARCHAR(100),
        arbitrary_name_2 VARCHAR(100),
        arbitrary_name_3 VARCHAR(100),
        reference_disease_name VARCHAR(100),
        calculation_date VARCHAR(100),
        missing_comment VARCHAR(100),
        patient_condition_1 VARCHAR(100),
        patient_condition_2 VARCHAR(100),
        patient_condition_3 VARCHAR(100),
        patient_condition_4 VARCHAR(100),
        patient_condition_5 VARCHAR(100),
        patient_condition_6 VARCHAR(100),
        patient_condition_7 VARCHAR(100),
        patient_condition_8 VARCHAR(100),
        patient_condition_9 VARCHAR(100),
        patient_condition_10 VARCHAR(100),
        patient_condition11 VARCHAR(100),
        patient_condition12 VARCHAR(100),
        patient_condition13 VARCHAR(100),
        patient_condition14 VARCHAR(100),
        patient_condition15 VARCHAR(100),
        patient_condition16 VARCHAR(100),
        patient_condition17 VARCHAR(100),
        patient_condition18 VARCHAR(100),
        patient_condition19 VARCHAR(100),
        patient_condition20 VARCHAR(100),
        created_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        update_date DATETIME DEFAULT CURRENT_TIMESTAMP
        );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE IF EXISTS dpc_error_t;');
  }
}
