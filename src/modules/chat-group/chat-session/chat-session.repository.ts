import { EntityRepository, Repository } from 'typeorm';
import { ChatSession } from './chat_session.entity';

@EntityRepository(ChatSession)
export class ChatSessionRepository extends Repository<ChatSession> {
  // async findAll(query: AccountQueryDto): Promise<Account[]> {
  //   const qb = this.createQueryBuilder('user').select('*');
  //   if (query?.keyword) {
  //     qb.orWhere('user.given_name LIKE :keyword');
  //     qb.orWhere('user.first_name LIKE :keyword');
  //     qb.orWhere('user.account_id LIKE :keyword');
  //     qb.setParameter('keyword', `%${query.keyword.trim()}%`);
  //   }
  //   qb.orderBy('user.record_creation_date', 'DESC');
  //   return qb.getRawMany<Account>();
  // }
}
