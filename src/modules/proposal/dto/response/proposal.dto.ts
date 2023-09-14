import { ApiProperty } from '@nestjs/swagger';
import { ProposalAdoptionFlag } from '../enum/proposal-adoption-flag.enum';
import { ProposalPoint } from '../enum/proposal-point.enum';
import { Expose } from 'class-transformer';

export class ProposalDto {
  @ApiProperty()
  @Expose()
  proposal_id: number;

  @ApiProperty()
  @Expose()
  group_id: number;

  @ApiProperty()
  @Expose()
  account_id: number;

  @ApiProperty()
  @Expose()
  account_nickname?: string;

  @ApiProperty()
  @Expose()
  mi_id: number;

  @ApiProperty()
  @Expose()
  medical_institution_name: string;

  @ApiProperty()
  @Expose()
  title: string;

  @ApiProperty()
  @Expose()
  proposal_content: string;

  @ApiProperty()
  @Expose()
  proposal_date: Date;

  @ApiProperty()
  @Expose()
  point: ProposalPoint;

  @ApiProperty()
  @Expose()
  adoption_flag: ProposalAdoptionFlag;

  @ApiProperty()
  @Expose()
  created_date: Date;

  @ApiProperty()
  @Expose()
  update_date: Date;
}
