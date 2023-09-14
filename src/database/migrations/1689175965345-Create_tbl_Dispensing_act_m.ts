import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTblDispensingActM1689175965345
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS dispensing_act_m (
            id INT PRIMARY KEY AUTO_INCREMENT,
            change_category INT,
            master_identification VARCHAR(1),
            dispensing_code INT UNIQUE NOT NULL,
            kanji_significant_digits INT,
            kanji_name VARCHAR(64),
            number_of_significant_digits INT,
            kana_name  VARCHAR(20),
            symbol_code_for_receipt_display INT,
            receipt_display_order_number INT,
            score_identification INT,
            dispensing_quantity_calculation_flag INT,
            basic_score INT,
            step_value_calculation_identification INT,
            lower_limit INT,
            upper_limit INT,
            increment_value INT,
            increment_score INT,
            upper_and_lower_limit_error_handling INT,
            subtraction_act_classification INT,
            subtraction_target_act_category INT,
            dispensing_act_identification_division INT,
            comprehensive_identification_class INT,
            spare_1 INT,
            spare_2 INT,
            reserve_3 INT,
            spare_4 INT,
            spare_5 INT,
            dispensing_act_type_1 INT,
            dispensing_act_type_2 INT,
            latter_stage_elderly_application_category INT,
            facility_standard_code_1 INT,
            facility_standard_code_2 INT,
            facility_standard_code_3 INT,
            facility_standard_code_4 INT,
            facility_standard_code_5 INT,
            facility_standard_code_6 INT,
            facility_standard_code_7 INT,
            facility_standard_code_8 INT,
            facility_standard_code_9 INT,
            facility_standard_code_10 INT,
            receipt_contradiction_category INT,
            prescription_contradiction_category INT,
            dispensing_conflict_classification INT,
            medicine INT,
            time_addition_division INT,
            dosage_form INT,
            maximum_number_of_times_1 INT,
            upper_limit_count_error_processing_1 INT,
            maximum_number_of_times_2 INT,
            upper_limit_count_error_processing_2 INT,
            code INT,
            serial_number VARCHAR(1),
            minimum_age VARCHAR(2),
            upper_age_limit VARCHAR(2),
            pharmaceutical_management_fee_category INT,
            notification_identification_category_1 INT,
            notification_identification_category_2 INT,
            old_score_identification INT,
            old_score INT,
            date_of_change INT,
            abolition_date INT,
            sequence_number INT,
            table_number INT,
            related_number INT,
            transfer INT,
            created_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            update_date DATETIME DEFAULT CURRENT_TIMESTAMP
        );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE IF EXISTS dispensing_act_m;');
  }
}
