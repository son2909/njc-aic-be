import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterSetDefaultColumnsAccountTbl1688289752442
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
            ALTER TABLE account_management_t 
            ALTER account_rank SET DEFAULT 4,
            ALTER rank_config SET DEFAULT 1,
            ALTER cumulative_like_points SET DEFAULT 0,
            ALTER cumulative_number_of_proposals SET DEFAULT 0,
            ALTER cumulative_cases SET DEFAULT 0,
            ALTER processing_time SET DEFAULT 0,
            ALTER number_of_delivery_delays SET DEFAULT 0,
            ALTER inspection_incomplete_count SET DEFAULT 0;
        `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
            ALTER TABLE account_management_t 
            ALTER account_rank DROP DEFAULT,
            ALTER rank_config DROP DEFAULT,
            ALTER cumulative_like_points DROP DEFAULT,
            ALTER cumulative_number_of_proposals DROP DEFAULT,
            ALTER cumulative_cases DROP DEFAULT,
            ALTER processing_time DROP DEFAULT,
            ALTER number_of_delivery_delays DROP DEFAULT,
            ALTER inspection_incomplete_count DROP DEFAULT;
        `,
    );
  }
}
