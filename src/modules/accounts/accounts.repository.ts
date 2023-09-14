import { EntityRepository, Repository } from 'typeorm';
import { Order } from '../../enum';
import { GroupLink } from '../group-link/group-link.entity';
import { GroupManagement } from '../group-management/group-management.entity';
import { Account } from './accounts.entity';
import { AccountGroupDto } from './dto/account-group.dto';
import { AccountQueryDto } from './dto/account.query.dto';

@EntityRepository(Account)
export class AccountRepository extends Repository<Account> {
  async findAll(query: AccountQueryDto): Promise<Account[]> {
    const qb = this.createQueryBuilder('user').select('*');
    if (query?.keyword) {
      qb.orWhere('user.given_name LIKE :keyword');
      qb.orWhere('user.first_name LIKE :keyword');
      qb.orWhere('user.account_id LIKE :keyword');
      qb.setParameter('keyword', `%${query.keyword.trim()}%`);
    }
    qb.orderBy('user.record_creation_date', 'DESC');

    return qb.getRawMany<Account>();
  }

  async getAccountGroup(account_id: number) {
    const qb = this.createQueryBuilder('amt')
      .select(
        ` amt.account_id account_id,
          amt.nickname nickname,
          amt.first_name first_name,
          amt.given_name given_name,
          amt.account_rank account_rank,
          amt.unit_price unit_price,
          amt.cumulative_like_points cumulative_like_points,
          amt.cumulative_number_of_proposals cumulative_number_of_proposals,
          amt.record_creation_date created_date,
          JSON_ARRAYAGG(JSON_OBJECT('group_name', gm.group_name, 'group_color', gm.color)) \`groups\``,
      )
      .leftJoin(GroupLink, 'gl', 'gl.account_id = amt.account_id')
      .leftJoin(GroupManagement, 'gm', 'gm.group_id = gl.group_id')
      .where('amt.account_id <> :account_id', { account_id })
      .groupBy('amt.account_id')
      .orderBy({
        first_name: Order.ASC,
      });
    return qb.getRawMany<AccountGroupDto>();
  }
}
