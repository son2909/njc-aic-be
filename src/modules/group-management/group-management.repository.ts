import { EntityRepository, Repository, getManager } from 'typeorm';
import { Account } from '../accounts/accounts.entity';
import { GroupLink } from '../group-link/group-link.entity';
import { GroupManagement } from './group-management.entity';

@EntityRepository(GroupManagement)
export class GroupManagementRepository extends Repository<GroupManagement> {
  async getGroupsExclude(account_id: number): Promise<GroupManagement[]> {
    const qb = getManager()
      .createQueryBuilder(GroupManagement, 'group')
      .select('group.group_id', 'group_id')
      .addSelect('group.account_id', 'account_id')
      .addSelect('group.group_name', 'group_name')
      .addSelect('group.group_contents', 'group_contents')
      .innerJoin(
        GroupLink,
        'group_link',
        'group.group_id = group_link.group_id',
      )
      .innerJoin(
        Account,
        'account',
        'account.account_id = group_link.account_id',
      )
      .where('account.account_id = :account_id', {
        account_id: account_id,
      });
    // .andWhere('group.account_id <> :account_id', {
    //   account_id: account_id,
    // });
    return qb.getRawMany();
  }
}
