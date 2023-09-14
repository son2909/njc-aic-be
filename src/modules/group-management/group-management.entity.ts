import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'group_management_t' })
export class GroupManagement extends BaseEntity {
  @PrimaryGeneratedColumn()
  group_id: number;

  @Column()
  group_name: string;

  @Column()
  group_contents: string;

  @Column()
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

  @Column()
  color: number;

  constructor(partial: Partial<GroupManagement>) {
    super();
    Object.assign(this, partial);
  }
}
