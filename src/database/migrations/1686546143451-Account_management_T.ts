import { MigrationInterface, QueryRunner } from 'typeorm';

export class AccountManagementT1686546143451 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS account_management_t (
        account_id INT AUTO_INCREMENT PRIMARY KEY,
        first_name VARCHAR(30) NOT NULL,
        given_name VARCHAR(30) NOT NULL,
        nickname VARCHAR(30) NOT NULL,
        mail_address VARCHAR(30) NOT NULL,
        address VARCHAR(50) NOT NULL,
        telephone_number VARCHAR(50) NOT NULL,
        group_id INT NOT NULL,
        account_classification INT NOT NULL,
        mi_id INT,
        account_rank INT NOT NULL,
        cumulative_like_points INT NOT NULL,
        cumulative_number_of_proposals INT NOT NULL,
        unit_price INT NOT NULL,
        cumulative_cases INT NOT NULL,
        cumulative_points INT,
        cumulative_number_processed INT ,
        processing_time INT NOT NULL,
        number_of_delivery_delays INT NOT NULL,
        inspection_incomplete_count INT NOT NULL,
        hire_date DATE,
        work_start_date DATE,
        change_request_flag DATE,
        record_creation_date DATETIME NOT NULL,
        record_update_date DATETIME 
    );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE IF EXISTS account_management_t;');
  }
}
