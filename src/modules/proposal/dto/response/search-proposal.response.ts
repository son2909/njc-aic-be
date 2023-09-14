import { Expose } from 'class-transformer';
import { ProposalPoint } from '../enum/proposal-point.enum';

export class SearchProposalResponse {
  @Expose()
  proposal_proposal_id: number;

  @Expose()
  proposal_mi_id: number;

  @Expose()
  proposal_title: string;

  @Expose()
  proposal_proposal_content: string;

  @Expose()
  medical_medical_institution_name: string;

  @Expose()
  account_nickname: string;

  @Expose()
  proposal_point: ProposalPoint;
}
