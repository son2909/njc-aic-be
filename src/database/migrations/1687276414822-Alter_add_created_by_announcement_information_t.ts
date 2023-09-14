import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterAddCreatedByAnnouncementInformationT1687276414822
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE announcement_information_t ADD COLUMN account_id INT`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE announcement_information_t DROP COLUMN account_id`,
    );
  }
}
