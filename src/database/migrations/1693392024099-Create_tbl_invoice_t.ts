import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTblInvoiceT1693392024099 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS invoice_t(
                                 invoice_id int AUTO_INCREMENT primary key ,
                                 mi_id int  NOT NULL ,
                                 upload_date DATETIME  NOT NULL ,
                                 created_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                                 update_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
       );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE IF EXISTS invoice_t;');
  }
}
