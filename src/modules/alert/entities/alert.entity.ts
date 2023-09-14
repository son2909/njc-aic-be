import { DisplayCodeOne } from '../../../modules/announcement/dto/enum/announcement-display-1.enum';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'alert_t' })
export class Alert extends BaseEntity {
  @PrimaryGeneratedColumn()
  alert_id: number;

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
    name: 'created_date',
    type: 'timestamp',
  })
  created_date: Date;

  @UpdateDateColumn({
    name: 'update_date',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  update_date: Date;

  constructor(partial: Partial<Alert>) {
    super();
    Object.assign(this, partial);
  }
}
