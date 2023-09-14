import { EntityRepository, Repository } from 'typeorm';
import { GroupLink } from './group-link.entity';
import { Account } from '../accounts/accounts.entity';

@EntityRepository(GroupLink)
export class GroupLinkRepository extends Repository<GroupLink> {
  async getInfoAccountByGroupIds(group_Ids: number[]) {
    const qb = this.createQueryBuilder('glt')
      .select(
        `
          glt.group_id,
          JSON_ARRAYAGG(JSON_OBJECT(
            'account_id', ac.account_id,
            'parent_group_id', glt.group_id,
            'nickname', ac.nickname,
            'first_name', ac.first_name,
            'given_name', ac.given_name,
            'mail_address', ac.mail_address,
            'address', ac.address,
            'telephone_number', ac.telephone_number,
            'account_group_id', ac.group_id,
            'account_classification', ac.account_classification,
            'mi_id', ac.mi_id,
            'rank', ac.account_rank,
            'cumulative_like_points', ac.cumulative_like_points,
            'cumulative_number_of_proposals', ac.cumulative_number_of_proposals,
            'unit_price', ac.unit_price,
            'cumulative_cases', ac.cumulative_cases,
            'cumulative_points', ac.cumulative_points,
            'cumulative_number_processed', ac.cumulative_number_processed,
            'processing_time', ac.processing_time,
            'number_of_delivery_delays', ac.number_of_delivery_delays,
            'inspection_incomplete_count', ac.inspection_incomplete_count,
            'hire_date', ac.hire_date,
            'work_start_date', ac.work_start_date,
            'change_request_flag', ac.change_request_flag,
            'record_creation_date', ac.record_creation_date
           )) as members
          `,
      )
      .innerJoin(Account, 'ac', 'glt.account_id = ac.account_id')
      .where('glt.group_id IN (:...group_Ids)', { group_Ids })
      .groupBy('glt.group_id');

    return qb.getRawMany();
  }
}
