import { MigrationInterface, QueryRunner } from 'typeorm';

export class SpecificEquipmentM1689142434239 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS specific_equipment_m (
          id INT PRIMARY KEY AUTO_INCREMENT,
          change_category INT,
          master_type VARCHAR(1),
          specified_equipment_code INT UNIQUE NOT NULL,
          kanji_significant_digits_1 INT,
          kanji_name_1 VARCHAR(64),
          number_of_significant_digits INT,
          kana_name VARCHAR(20),
          code INT,
          kanji_significant_digits_2 INT,
          kanji_name_2 VARCHAR(12),
          amount_type_1 INT,
          cash_amount INT,
          name_use_identification INT,
          age_addition_category INT,
          minimum_age VARCHAR(2),
          upper_age_limit VARCHAR(2),
          amount_type_2 INT,
          old_amount INT,
          kanji_name_change_category INT,
          kana_name_change_category INT,
          classification_such_as_oxygen INT,
          specified_equipment_type INT,
          maximum_price INT,
          maximum_number_of_points INT,
          spare_1 VARCHAR(85),
          publication_sequence_number INT,
          abolition INT,
          date_of_change INT,
          date_of_transitional_measure INT,
          abolition_date INT,
          attached_table_number INT,
          division_number INT,
          dpc_application_category INT,
          spare_2 VARCHAR(10),
          reserve_3 VARCHAR(10),
          spare_4 VARCHAR(10),
          basic_kanji_name VARCHAR(300),
          created_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
          update_date DATETIME DEFAULT CURRENT_TIMESTAMP
        );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE IF EXISTS specific_equipment_m;');
  }
}
