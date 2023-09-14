import { EntityRepository, Repository } from 'typeorm';
import { ChatGroup } from './chat_group.entity';

@EntityRepository(ChatGroup)
export class ChatGroupRepository extends Repository<ChatGroup> {
  //   async findAll(query: AccountQueryDto): Promise<Account[]> {
  //     const qb = this.createQueryBuilder('user').select('*');
  //     if (query?.keyword) {
  //       qb.orWhere('user.given_name LIKE :keyword');
  //       qb.orWhere('user.first_name LIKE :keyword');
  //       qb.orWhere('user.account_id LIKE :keyword');
  //       qb.setParameter('keyword', `%${query.keyword.trim()}%`);
  //     }
  //     qb.orderBy('user.record_creation_date', 'DESC');
  //     return qb.getRawMany<Account>();
  //   }
}
