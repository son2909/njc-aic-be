import {
  AccountRankConfigEnum,
  AccountRankEnum,
} from './../../enum/account.enum';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from '../../enum/role.enum';

@Entity({ name: 'account_management_t' })
export class Account extends BaseEntity {
  @PrimaryGeneratedColumn()
  account_id: number;

  @Column()
  first_name: string;

  @Column()
  given_name: string;

  @Column()
  nickname: string;

  @Column()
  mail_address: string;

  @Column()
  address: string;

  @Column()
  telephone_number: string;

  @Column()
  group_id: number;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.CLIENT,
  })
  account_classification: Role;

  @Column()
  mi_id: number;

  @Column({
    type: 'enum',
    enum: AccountRankEnum,
    default: AccountRankEnum.BRONZE,
  })
  account_rank: AccountRankEnum;

  @Column({
    type: 'enum',
    enum: AccountRankConfigEnum,
    default: AccountRankConfigEnum.AUTOMATIC_SETTING,
  })
  rank_config: AccountRankConfigEnum;

  @Column({
    type: Number,
    default: 0,
  })
  cumulative_like_points: number;

  @Column({
    type: Number,
    default: 0,
  })
  cumulative_number_of_proposals: number;

  @Column()
  unit_price: number;

  @Column({
    type: Number,
    default: 0,
  })
  cumulative_cases: number;

  @Column()
  cumulative_points: number;

  @Column()
  cumulative_number_processed: number;

  @Column({
    type: Number,
    default: 0,
  })
  processing_time: number;

  @Column({
    type: Number,
    default: 0,
  })
  number_of_delivery_delays: number;

  @Column({
    type: Number,
    default: 0,
  })
  inspection_incomplete_count: number;

  @Column()
  hire_date: Date;

  @Column()
  work_start_date: Date;

  @Column()
  change_request_flag: Date;

  @CreateDateColumn({
    default: () => 'CURRENT_TIMESTAMP',
    nullable: true,
    name: 'record_creation_date',
  })
  record_creation_date: Date;

  @UpdateDateColumn({
    nullable: true,
    name: 'record_update_date',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  record_update_date: Date;

  constructor(partial: Partial<Account>) {
    super();
    Object.assign(this, partial);
  }
}
