import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'medical_institution_m' })
export class MedicalInstitution extends BaseEntity {
  @PrimaryGeneratedColumn()
  mi_id: number;

  @Column()
  medical_institution_name: string;

  @Column()
  officer_name: string;

  @CreateDateColumn({
    default: `now()`,
    nullable: true,
    name: 'created_date',
  })
  created_date: string;

  @CreateDateColumn({
    default: `now()`,
    name: 'update_date',
  })
  update_date: string;
}
