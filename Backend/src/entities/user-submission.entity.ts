import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('user_submissions')
export class UserSubmission {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'int' })
  age: number;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  income: number;

  @Column({ type: 'int' })
  dependents: number;

  @Column({ type: 'varchar', length: 20 })
  riskTolerance: string;

  @Column({ type: 'jsonb', nullable: true })
  recommendation: any;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
