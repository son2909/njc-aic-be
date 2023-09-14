import { MigrationInterface, QueryRunner } from 'typeorm';

export class CommentM1689045573788 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS comment_m (
            id INT PRIMARY KEY AUTO_INCREMENT,
            change_category INT,
            master_type VARCHAR(1),
            division INT DEFAULT 8,
            pattern INT,
            number INT NOT NULL UNIQUE,
            kanji_significant_digits INT,
            kanji_name VARCHAR(64),
            number_of_significant_digits INT,
            kana_name VARCHAR(20),
            column_position_1 INT,
            number_of_digits_1 INT,
            column_position_2 INT,
            number_of_digits_2 INT,
            column_position_3 INT,
            number_of_digits_3 INT,
            column_position_4 INT,
            number_of_digits_4 INT,
            kanji_name_change_category INT,
            kana_name_change_category INT,
            created_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            update_date DATETIME DEFAULT CURRENT_TIMESTAMP
        );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE IF EXISTS comment_m;');
  }
}
