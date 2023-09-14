import {
  BaseEntity,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'group_link_t' })
export class GroupLink extends BaseEntity {
  @PrimaryColumn()
  group_id: number;

  @PrimaryColumn()
  account_id: number;

  @CreateDateColumn({
    default: () => 'CURRENT_TIMESTAMP',
    nullable: true,
    name: 'created_date',
  })
  created_date: Date;

  @UpdateDateColumn({
    nullable: true,
    name: 'update_date',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  update_date: Date;

  constructor(partial: Partial<GroupLink>) {
    super();
    Object.assign(this, partial);
  }
}
