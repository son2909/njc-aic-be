import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTblInjuryNameM1689262511039 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS injury_name_m (
            id INT PRIMARY KEY AUTO_INCREMENT,
            change_category INT,
            master_type VARCHAR(1),
            injury_name_code INT UNIQUE NOT NULL,
            destination_code INT,
            basic_name_number_of_digits INT,
            basic_name VARCHAR(60),
            abbreviated_name_digits INT,
            short_name VARCHAR(40),
            kana_name_digits INT,
            kana_name VARCHAR(100),
            control_number INT,
            adoption_category INT,
            exchange_code VARCHAR(4),
            spare_1 VARCHAR(5),
            spare_2 VARCHAR(5),
            icd101 VARCHAR(5),
            icd102 VARCHAR(5),
            reserve_3 VARCHAR(5),
            single_use_prohibited_category INT,
            non_claimable_category INT,
            specific_disease_target_category INT,
            listing_date INT,
            date_of_change INT,
            abolition_date INT,
            basic_name_change INT,
            abbreviated_name_change INT,
            kana_name_change INT,
            adoption_category_change INT,
            disease_name_exchange_code_change INT,
            spare_4 INT,
            spare_5 INT,
            category_for_outpatient INT,
            dentistry_category_for_specific_diseases INT,
            single_use_prohibited_category_change INT,
            non_claimable_category_change INT,
            specific_disease_target_category_change INT,
            disease_name_control_number INT,
            dental_abbreviation_str VARCHAR(40),
            dental_abbreviation INT,
            reserve_6 VARCHAR(10),
            spare_7 INT,
            dental_abbreviation_number_of_digits INT,
            intractable_disease_outpatient_target_category INT,
            dentistry_specific_disease_target_category INT,
            icd101_change INT,
            icd102_change INT,
            created_date DATETIME,
            update_date DATETIME      
        );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE IF EXISTS injury_name_m;');
  }
}
