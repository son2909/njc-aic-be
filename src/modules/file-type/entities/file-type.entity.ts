import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { FileDeliveryEnum } from '../enum/file-delivery.enum';

@Entity({ name: 'file_type_m' })
export class FileType extends BaseEntity {
  @PrimaryGeneratedColumn()
  file_type_id: number;

  @Column()
  content: string;

  @Column({
    type: 'enum',
    enum: FileDeliveryEnum,
  })
  is_delivery: FileDeliveryEnum;

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

  constructor(partial: Partial<FileType>) {
    super();
    Object.assign(this, partial);
  }
}
