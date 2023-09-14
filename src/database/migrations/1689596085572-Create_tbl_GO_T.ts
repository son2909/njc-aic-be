import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTblGOT1689596085572 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS go_t (
        id INT AUTO_INCREMENT PRIMARY KEY,
        mi_id INT,
        f_id INT,
        p_id INT,
receipt_int INT,
        num1 VARCHAR(30),
        identification_information VARCHAR(2),
        the_total_number_of_cases INT,
        total_points INT,
        multi_volume_identification_information INT,
        created_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        update_date DATETIME DEFAULT CURRENT_TIMESTAMP
    );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE IF EXISTS go_t;');
  }
}
