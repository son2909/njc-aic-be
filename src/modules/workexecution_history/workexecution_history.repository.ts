import { EntityRepository, Repository, getManager } from 'typeorm';
import { WorkexecutionHistory } from './entities/workexecution_history.entity';
import { EntityId } from 'typeorm/repository/EntityId';
import { SearchWorkHistoryRequestDto } from './dto/search-work-history-request.dto';

@EntityRepository(WorkexecutionHistory)
export class WorkexecutionHistoryRepository extends Repository<WorkexecutionHistory> {
  async searchWorkHistoryRequest(
    accountId: EntityId,
    fromDate: string,
    toDate: string,
  ): Promise<SearchWorkHistoryRequestDto[]> {
    return await getManager().query(
      `select
      CONCAT(SUBSTRING(wht.date, 1, 4), '年', SUBSTRING(wht.date, 6), '月') AS date ,
      gmt.group_name ,
      mim.medical_institution_name ,
      count(rit.id) receipt,
      sum(case when rit.status_check_flag = 1 then 1 else 0 end) record_processed,
      count(pmt.proposal_id) scheme,
      sum(case when pmt.\`point\` = 1 then 1 else 0 end) like_point
  from
    account_management_t amt
  inner join (SELECT
    account_id,
    mi_id,
    CONCAT(year, '-', SUBSTRING_INDEX(SUBSTRING_INDEX(value, '-', numbers.n), '-', -1)) AS date
FROM (
    SELECT 1 n UNION ALL
    SELECT 2 UNION ALL SELECT 3 UNION ALL
    SELECT 4 UNION ALL SELECT 5 UNION ALL
    SELECT 6 UNION ALL SELECT 7 UNION ALL
    SELECT 8 UNION ALL SELECT 9 UNION ALL
    SELECT 10 UNION ALL SELECT 11 UNION ALL
    SELECT 12
) numbers
INNER JOIN (
    SELECT account_id, mi_id, '2023' AS year, \`2023\` AS value FROM workexecution_history_t
    UNION ALL
    SELECT account_id, mi_id, '2024' AS year, \`2024\` AS value FROM workexecution_history_t
    UNION ALL
    SELECT account_id, mi_id, '2025' AS year, \`2025\` AS value FROM workexecution_history_t
        UNION ALL
    SELECT account_id, mi_id, '2026' AS year, \`2026\` AS value FROM workexecution_history_t
        UNION ALL
    SELECT account_id, mi_id, '2027' AS year, \`2027\` AS value FROM workexecution_history_t
        UNION ALL
    SELECT account_id, mi_id, '2028' AS year, \`2028\` AS value FROM workexecution_history_t
        UNION ALL
    SELECT account_id, mi_id, '2029' AS year, \`2029\` AS value FROM workexecution_history_t
        UNION ALL
    SELECT account_id, mi_id, '2030' AS year, \`2030\` AS value FROM workexecution_history_t
        UNION ALL
    SELECT account_id, mi_id, '2031' AS year, \`2031\` AS value FROM workexecution_history_t
        UNION ALL
    SELECT account_id, mi_id, '2032' AS year, \`2032\` AS value FROM workexecution_history_t
        UNION ALL
    SELECT account_id, mi_id, '2033' AS year, \`2033\` AS value FROM workexecution_history_t
        UNION ALL
    SELECT account_id, mi_id, '2034' AS year, \`2034\` AS value FROM workexecution_history_t
        UNION ALL
    SELECT account_id, mi_id, '2035' AS year, \`2035\` AS value FROM workexecution_history_t
        UNION ALL
    SELECT account_id, mi_id, '2036' AS year, \`2036\` AS value FROM workexecution_history_t
        UNION ALL
    SELECT account_id, mi_id, '2037' AS year, \`2037\` AS value FROM workexecution_history_t
        UNION ALL
    SELECT account_id, mi_id, '2038' AS year, \`2038\` AS value FROM workexecution_history_t
        UNION ALL
    SELECT account_id, mi_id, '2039' AS year, \`2039\` AS value FROM workexecution_history_t
        UNION ALL
    SELECT account_id, mi_id, '2040' AS year, \`2040\` AS value FROM workexecution_history_t
    UNION ALL
    SELECT account_id, mi_id, '2041' AS year, \`2041\` AS value FROM workexecution_history_t
        UNION ALL
    SELECT account_id, mi_id, '2042' AS year, \`2042\` AS value FROM workexecution_history_t
        UNION ALL
    SELECT account_id, mi_id, '2043' AS year, \`2043\` AS value FROM workexecution_history_t
        UNION ALL
    SELECT account_id, mi_id, '2044' AS year, \`2044\` AS value FROM workexecution_history_t
        UNION ALL
    SELECT account_id, mi_id, '2045' AS year, \`2045\` AS value FROM workexecution_history_t
        UNION ALL
    SELECT account_id, mi_id, '2046' AS year, \`2046\` AS value FROM workexecution_history_t
        UNION ALL
    SELECT account_id, mi_id, '2047' AS year, \`2047\` AS value FROM workexecution_history_t
        UNION ALL
    SELECT account_id, mi_id, '2048' AS year, \`2048\` AS value FROM workexecution_history_t
            UNION ALL
    SELECT account_id, mi_id, '2049' AS year, \`2049\` AS value FROM workexecution_history_t
        UNION ALL
    SELECT account_id, mi_id, '2050' AS year, \`2050\` AS value FROM workexecution_history_t
           UNION ALL
    SELECT account_id, mi_id, '2051' AS year, \`2051\` AS value FROM workexecution_history_t
            UNION ALL
    SELECT account_id, mi_id, '2052' AS year, \`2052\` AS value FROM workexecution_history_t
            UNION ALL
    SELECT account_id, mi_id, '2053' AS year, \`2053\` AS value FROM workexecution_history_t
            UNION ALL
    SELECT account_id, mi_id, '2054' AS year, \`2054\` AS value FROM workexecution_history_t
            UNION ALL
    SELECT account_id, mi_id, '2055' AS year, \`2055\` AS value FROM workexecution_history_t
            UNION ALL
    SELECT account_id, mi_id, '2056' AS year, \`2056\` AS value FROM workexecution_history_t
            UNION ALL
    SELECT account_id, mi_id, '2057' AS year, \`2057\` AS value FROM workexecution_history_t
            UNION ALL
    SELECT account_id, mi_id, '2058' AS year, \`2058\` AS value FROM workexecution_history_t
            UNION ALL
    SELECT account_id, mi_id, '2059' AS year, \`2059\` AS value FROM workexecution_history_t
                UNION ALL
    SELECT account_id, mi_id, '2060' AS year, \`2060\` AS value FROM workexecution_history_t
) workexecution_years
ON CHAR_LENGTH(workexecution_years.value) - CHAR_LENGTH(REPLACE(workexecution_years.value, '-', '')) >= numbers.n - 1
where account_id = ?) wht on
    amt.account_id = wht.account_id
    and amt.mi_id = wht.mi_id
  left join receipt_information_t rit on
    wht.account_id = rit.account_id
    and wht.mi_id = rit.mi_id
    and wht.date = DATE_FORMAT(rit.date_of_medical_treatment,'%Y-%m')
  left join group_management_t gmt on
    amt.group_id = gmt.group_id
  left join proposal_management_t pmt on
  wht.account_id = pmt.account_id
  and wht.mi_id = pmt.mi_id
  and wht.date = DATE_FORMAT(pmt.proposal_date ,'%Y-%m')
  left join medical_institution_m mim on amt.mi_id = mim.mi_id 
  where wht.date >= ? and wht.date <= ?
  group by
    amt.account_id ,
    amt.mi_id , wht.date order by wht.date desc`,
      [accountId, fromDate, toDate],
    );
  }

  async getLikePoint(account_id): Promise<any> {
    return await getManager().query(
      'select COALESCE(sum(case when pmt.`point` = 1 then 1 else 0 end), 0) like_point from proposal_management_t pmt where account_id = ?',
      [account_id],
    );
  }

  async getScheme(account_id): Promise<any> {
    return await getManager().query(
      'select count(1) scheme from proposal_management_t pmt where account_id = ? ',
      [account_id],
    );
  }

  async getTimeExcute(account_id): Promise<any> {
    return await getManager().query(
      `select
      COALESCE(sum(case when inspection_time is not null then 1 else 0 end ),0) cumulative,
      COALESCE(sum(case when inspection_time is not null and status_check_flag = 1 then 1 else 0 end ),0) processing_time,
      COALESCE(FLOOR(sum(COALESCE(inspection_time, 0))/ sum(case when inspection_time is not null and status_check_flag = 1 then 1 else 0 end )),0) cumulative_number_processed
    from
      receipt_information_t rit
    where
      account_id = ?
    group by
      account_id`,
      [account_id],
    );
  }

  async getWorkDate(account_id): Promise<any> {
    return await getManager().query(
      `SELECT
      account_id,
      mi_id,
      GROUP_CONCAT(case when yearCl = 2023 then monthCl else null end order by monthCl asc SEPARATOR '-') \`2023\`,
      GROUP_CONCAT(case when yearCl = 2024 then monthCl else null end order by monthCl asc SEPARATOR '-') \`2024\`,
      GROUP_CONCAT(case when yearCl = 2025 then monthCl else null end order by monthCl asc SEPARATOR '-') \`2025\`,
      GROUP_CONCAT(case when yearCl = 2026 then monthCl else null end order by monthCl asc SEPARATOR '-') \`2026\`,
      GROUP_CONCAT(case when yearCl = 2027 then monthCl else null end order by monthCl asc SEPARATOR '-') \`2027\`,
      GROUP_CONCAT(case when yearCl = 2028 then monthCl else null end order by monthCl asc SEPARATOR '-') \`2028\`,
      GROUP_CONCAT(case when yearCl = 2029 then monthCl else null end order by monthCl asc SEPARATOR '-') \`2029\`,
      GROUP_CONCAT(case when yearCl = 2030 then monthCl else null end order by monthCl asc SEPARATOR '-') \`2030\`,
      GROUP_CONCAT(case when yearCl = 2031 then monthCl else null end order by monthCl asc SEPARATOR '-') \`2031\`,
      GROUP_CONCAT(case when yearCl = 2032 then monthCl else null end order by monthCl asc SEPARATOR '-') \`2032\`,
      GROUP_CONCAT(case when yearCl = 2033 then monthCl else null end order by monthCl asc SEPARATOR '-') \`2033\`,
      GROUP_CONCAT(case when yearCl = 2034 then monthCl else null end order by monthCl asc SEPARATOR '-') \`2034\`,
      GROUP_CONCAT(case when yearCl = 2035 then monthCl else null end order by monthCl asc SEPARATOR '-') \`2035\`,
      GROUP_CONCAT(case when yearCl = 2036 then monthCl else null end order by monthCl asc SEPARATOR '-') \`2036\`,
      GROUP_CONCAT(case when yearCl = 2037 then monthCl else null end order by monthCl asc SEPARATOR '-') \`2037\`,
      GROUP_CONCAT(case when yearCl = 2038 then monthCl else null end order by monthCl asc SEPARATOR '-') \`2038\`,
      GROUP_CONCAT(case when yearCl = 2039 then monthCl else null end order by monthCl asc SEPARATOR '-') \`2039\`,
      GROUP_CONCAT(case when yearCl = 2040 then monthCl else null end order by monthCl asc SEPARATOR '-') \`2040\`,
      GROUP_CONCAT(case when yearCl = 2041 then monthCl else null end order by monthCl asc SEPARATOR '-') \`2041\`,
      GROUP_CONCAT(case when yearCl = 2042 then monthCl else null end order by monthCl asc SEPARATOR '-') \`2042\`,
      GROUP_CONCAT(case when yearCl = 2043 then monthCl else null end order by monthCl asc SEPARATOR '-') \`2043\`,
      GROUP_CONCAT(case when yearCl = 2044 then monthCl else null end order by monthCl asc SEPARATOR '-') \`2044\`,
      GROUP_CONCAT(case when yearCl = 2045 then monthCl else null end order by monthCl asc SEPARATOR '-') \`2045\`,
      GROUP_CONCAT(case when yearCl = 2046 then monthCl else null end order by monthCl asc SEPARATOR '-') \`2046\`,
      GROUP_CONCAT(case when yearCl = 2047 then monthCl else null end order by monthCl asc SEPARATOR '-') \`2047\`,
      GROUP_CONCAT(case when yearCl = 2048 then monthCl else null end order by monthCl asc SEPARATOR '-') \`2048\`,
      GROUP_CONCAT(case when yearCl = 2049 then monthCl else null end order by monthCl asc SEPARATOR '-') \`2049\`,
      GROUP_CONCAT(case when yearCl = 2050 then monthCl else null end order by monthCl asc SEPARATOR '-') \`2050\`,
      GROUP_CONCAT(case when yearCl = 2051 then monthCl else null end order by monthCl asc SEPARATOR '-') \`2051\`,
      GROUP_CONCAT(case when yearCl = 2052 then monthCl else null end order by monthCl asc SEPARATOR '-') \`2052\`,
      GROUP_CONCAT(case when yearCl = 2053 then monthCl else null end order by monthCl asc SEPARATOR '-') \`2053\`,
      GROUP_CONCAT(case when yearCl = 2054 then monthCl else null end order by monthCl asc SEPARATOR '-') \`2054\`,
      GROUP_CONCAT(case when yearCl = 2055 then monthCl else null end order by monthCl asc SEPARATOR '-') \`2055\`,
      GROUP_CONCAT(case when yearCl = 2056 then monthCl else null end order by monthCl asc SEPARATOR '-') \`2056\`,
      GROUP_CONCAT(case when yearCl = 2057 then monthCl else null end order by monthCl asc SEPARATOR '-') \`2057\`,
      GROUP_CONCAT(case when yearCl = 2058 then monthCl else null end order by monthCl asc SEPARATOR '-') \`2058\`,
      GROUP_CONCAT(case when yearCl = 2059 then monthCl else null end order by monthCl asc SEPARATOR '-') \`2059\`,
      GROUP_CONCAT(case when yearCl = 2060 then monthCl else null end order by monthCl asc SEPARATOR '-') \`2060\`
  FROM (
      SELECT DISTINCT
          account_id,
          mi_id,
          DATE_FORMAT(data_received_date, '%Y') AS yearCl,
          DATE_FORMAT(data_received_date, '%m') AS monthCl
      FROM
          receipt_information_t
      WHERE
          account_id = ?
  ) AS a
  GROUP BY
      account_id,
      mi_id`,
      [account_id],
    );
  }
}
