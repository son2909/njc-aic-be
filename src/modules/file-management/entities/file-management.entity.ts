import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { FileDivisionEnum } from '../enum/file-division.enum';

@Entity({ name: 'file_mamagement_t' })
export class FileManagement extends BaseEntity {
  @PrimaryGeneratedColumn()
  file_id: number;

  @Column()
  file_name: string;

  @Column()
  mi_id: number;

  @Column({
    type: 'enum',
    enum: FileDivisionEnum,
  })
  file_division: FileDivisionEnum;

  @Column()
  file_type_id: number;

  @Column()
  upload_date: Date;

  @Column()
  account_id: number;

  @Column()
  total_number: number;

  @Column()
  request_id: string;

  @Column()
  request_type: number;

  @CreateDateColumn({
    default: () => 'CURRENT_TIMESTAMP',
    name: 'created_date',
  })
  created_date: Date;

  @UpdateDateColumn({
    name: 'updated_date',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updated_date: Date;

  constructor(partial: Partial<FileManagement>) {
    super();
    Object.assign(this, partial);
  }
}
