import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProposalAdoptionFlag } from '../dto/enum/proposal-adoption-flag.enum';
import { ProposalPoint } from '../dto/enum/proposal-point.enum';

@Entity({ name: 'proposal_management_t' })
export class Proposal extends BaseEntity {
  @PrimaryGeneratedColumn()
  proposal_id: number;

  @Column()
  group_id: number;

  @Column()
  account_id: number;

  @Column()
  mi_id: number;

  @Column()
  title: string;

  @Column()
  proposal_content: string;

  @Column()
  proposal_date: Date;

  @Column({
    type: 'enum',
    enum: ProposalPoint,
    default: ProposalPoint.UNLIKE,
  })
  point: ProposalPoint;

  @Column({
    type: 'enum',
    enum: ProposalAdoptionFlag,
    default: ProposalAdoptionFlag.NOT_APPLY,
  })
  adoption_flag: ProposalAdoptionFlag;

  @CreateDateColumn({
    default: () => 'CURRENT_TIMESTAMP',
    nullable: true,
    name: 'created_date',
  })
  created_date: Date;

  @UpdateDateColumn({
    name: 'update_date',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  update_date: Date;
}
