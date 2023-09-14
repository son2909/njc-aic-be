import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'workexecution_history_t' })
export class WorkexecutionHistory extends BaseEntity {
  @Column()
  @PrimaryColumn()
  account_id: number;

  @Column()
  @PrimaryColumn()
  mi_id: number;

  @Column()
  2023: string;

  @Column()
  2024: string;

  @Column()
  2025: string;

  @Column()
  2026: string;

  @Column()
  2027: string;

  @Column()
  2028: string;

  @Column()
  2029: string;

  @Column()
  2030: string;

  @Column()
  2031: string;

  @Column()
  2032: string;

  @Column()
  2033: string;

  @Column()
  2034: string;

  @Column()
  2035: string;

  @Column()
  2036: string;

  @Column()
  2037: string;

  @Column()
  2038: string;

  @Column()
  2039: string;

  @Column()
  2040: string;

  @Column()
  2041: string;

  @Column()
  2042: string;

  @Column()
  2043: string;

  @Column()
  2044: string;

  @Column()
  2045: string;

  @Column()
  2046: string;

  @Column()
  2047: string;

  @Column()
  2048: string;

  @Column()
  2049: string;

  @Column()
  2050: string;

  @Column()
  2051: string;

  @Column()
  2052: string;

  @Column()
  2053: string;

  @Column()
  2054: string;

  @Column()
  2055: string;

  @Column()
  2056: string;

  @Column()
  2057: string;

  @Column()
  2058: string;

  @Column()
  2059: string;

  @Column()
  2060: string;

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
