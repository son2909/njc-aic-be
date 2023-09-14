import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DisplayCodeOne } from '../dto/enum/announcement-display-1.enum';

@Entity({ name: 'announcement_information_t' })
export class Announcement extends BaseEntity {
  @PrimaryGeneratedColumn()
  announcement_id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  date: Date;

  @Column()
  display_expiration_date: Date;

  @Column({
    type: 'enum',
    enum: DisplayCodeOne,
    default: DisplayCodeOne.CUSTOMER,
  })
  display_code_1: DisplayCodeOne;

  @Column()
  display_code_2: number;

  @Column()
  display_code_3: number;

  @Column()
  display_code_4: number;

  @Column()
  display_code_5: number;

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

  @Column()
  account_id: number;

  constructor(partial: Partial<Announcement>) {
    super();
    Object.assign(this, partial);
  }
}
