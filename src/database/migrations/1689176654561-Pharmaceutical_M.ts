import { MigrationInterface, QueryRunner } from 'typeorm';

export class PharmaceuticalM1689176654561 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS pharmaceutical_m (
            id INT AUTO_INCREMENT PRIMARY KEY,
            change_category INT,
            master_type VARCHAR(1),
            drug_code INT UNIQUE NOT NULL,
            kanji_digit_number_1 INT,
            kanji_name_1 VARCHAR(64),
            number_of_kana_digits INT,
            kana_name VARCHAR(20),
            code INT,
            kanji_digit_number_2 INT,
            kanji_name_2 VARCHAR(12),
            amount_type INT,
            new_cash_amount INT,
            spare_1 INT DEFAULT 0,
            medicine INT,
            neuroleptics INT,
            biologics INT,
            generic INT,
            spare_2 INT DEFAULT 0,
            dental_specific_drug INT,
            contrast_aid INT,
            injection_volume INT,
            identification_of_listing_method INT,
            related_to_product_names INT,
            old_amount_type INT,
            old_amount INT,
            kanji_change_category INT,
            kana_change_category INT,
            dosage_form INT,
            reserve_3 INT,
            date_of_change INT,
            abolition_date INT,
            drug_price_standard_code VARCHAR(12),
            publication_sequence_number INT,
            date_of_transitional_measure INT,
            basic_kanji_name VARCHAR(200),        
            created_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            update_date DATETIME DEFAULT CURRENT_TIMESTAMP
        );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE IF EXISTS pharmaceutical_m;');
  }
}
