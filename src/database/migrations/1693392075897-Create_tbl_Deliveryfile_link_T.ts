import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTblDeliveryfileLinkT1693392075897
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS delivery_file_link_t(
                                                  invoice_id int primary key,
                                                  file_id int NOT NULL,
                                                  mi_id int NOT NULL,
                                                  created_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                                                  update_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
             );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE IF EXISTS delivery_file_link_t;');
  }
}
