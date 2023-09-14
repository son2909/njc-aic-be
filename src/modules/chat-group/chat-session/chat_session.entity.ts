import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'chat_session_management_t' })
export class ChatSession extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  connected_id: string;

  @Column()
  account_id: number;

  @Column()
  connected_time: Date;

  constructor(partial: Partial<ChatSession>) {
    super();
    Object.assign(this, partial);
  }
}
