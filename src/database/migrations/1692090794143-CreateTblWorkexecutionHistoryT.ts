import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTblWorkexecutionHistoryT1692090794143
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      ` CREATE TABLE IF NOT EXISTS workexecution_history_t (
                account_id int not null,
                mi_id int not null,
                \`2023\` varchar(40),
                \`2024\` varchar(40),
                      \`2025\` varchar(40),
                      \`2026\` varchar(40),
                      \`2027\` varchar(40),
                      \`2028\` varchar(40),
                      \`2029\` varchar(40),
                      \`2030\` varchar(40),
                      \`2031\` varchar(40),
                      \`2032\` varchar(40),
                      \`2033\` varchar(40),
                      \`2034\` varchar(40),
                      \`2035\` varchar(40), 
                      \`2036\` varchar(40),
                      \`2037\` varchar(40),
                      \`2038\` varchar(40),
                      \`2039\` varchar(40),
                      \`2040\` varchar(40),
                      \`2041\` varchar(40),
                      \`2042\` varchar(40),
                      \`2043\` varchar(40),
                      \`2044\` varchar(40),
                      \`2045\` varchar(40),
                      \`2046\` varchar(40),
                      \`2047\` varchar(40),
                      \`2048\` varchar(40),
                      \`2049\` varchar(40),
                      \`2050\` varchar(40),
                      \`2051\` varchar(40),
                      \`2052\` varchar(40),
                      \`2053\` varchar(40),
                      \`2054\` varchar(40),
                      \`2055\` varchar(40),
                      \`2056\` varchar(40),
                      \`2057\` varchar(40),
                      \`2058\` varchar(40),
                      \`2059\` varchar(40),
                      \`2060\` varchar(40),
                      created_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                      update_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                      PRIMARY KEY (account_id, mi_id) );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE IF EXISTS workexecution_history_t;');
  }
}
