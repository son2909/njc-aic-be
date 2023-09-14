import { PageOptionsDto } from '../../common/dto/pagination-options.dto';
import { Order } from '../../enum';
import { EntityRepository, Repository, getManager } from 'typeorm';
import { Account } from '../accounts/accounts.entity';
import { MedicalInstitution } from '../medical-institution/entities/medical-institution.entity';
import { Proposal } from './entities/proposal.entity';

@EntityRepository(Proposal)
export class ProposalRepository extends Repository<Proposal> {
  async selectProposalInfo(
    pageOptionsDto: PageOptionsDto,
    account_id?: number,
  ) {
    const qb = this.buildQueryProposalInfo();
    if (account_id) {
      qb.where('proposal.account_id = :account_id', {
        account_id: account_id,
      });
    }
    qb.orderBy('proposal.created_date', Order.DESC)
      .offset(pageOptionsDto.page - 1)
      .limit(pageOptionsDto.limit);
    return qb.getRawMany();
  }

  async countProposalInfo(account_id?: number) {
    const qb = this.buildQueryProposalInfo();
    if (account_id) {
      qb.where('proposal.account_id = :account_id', {
        account_id: account_id,
      });
    }
    return qb.getCount();
  }

  buildQueryProposalInfo() {
    return getManager()
      .createQueryBuilder(Proposal, 'proposal')
      .select('proposal.proposal_id', 'proposal_id')
      .addSelect('proposal.mi_id', 'mi_id')
      .addSelect('proposal.title', 'title')
      .addSelect('proposal.proposal_content', 'proposal_content')
      .addSelect('proposal.created_date', 'created_date')
      .addSelect('proposal.point', 'point')
      .leftJoin(MedicalInstitution, 'medical', 'proposal.mi_id = medical.mi_id')
      .addSelect('medical.medical_institution_name', 'medical_institution_name')
      .leftJoin(Account, 'account', 'account.account_id = proposal.account_id')
      .addSelect('account.nickname');
  }
}
