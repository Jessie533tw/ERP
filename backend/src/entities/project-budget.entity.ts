import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm'
import { Project } from './project.entity'
import { BudgetCategory } from './budget-category.entity'
import { User } from './user.entity'

export enum BudgetStatus {
  DRAFT = 'draft',
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

@Entity('project_budgets')
export class ProjectBudget {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ name: 'project_id' })
  projectId: string

  @Column({ name: 'category_id', nullable: true })
  categoryId: string

  @Column({ name: 'item_name', length: 200 })
  itemName: string

  @Column({ type: 'text', nullable: true })
  description: string

  @Column({ length: 20, nullable: true })
  unit: string

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  quantity: number

  @Column({ name: 'unit_price', type: 'decimal', precision: 12, scale: 2, nullable: true })
  unitPrice: number

  @Column({ name: 'total_amount', type: 'decimal', precision: 15, scale: 2, nullable: true })
  totalAmount: number

  @Column({ name: 'approved_amount', type: 'decimal', precision: 15, scale: 2, nullable: true })
  approvedAmount: number

  @Column({ name: 'used_amount', type: 'decimal', precision: 15, scale: 2, default: 0 })
  usedAmount: number

  @Column({
    type: 'enum',
    enum: BudgetStatus,
    default: BudgetStatus.DRAFT,
  })
  status: BudgetStatus

  @Column({ name: 'approved_by', nullable: true })
  approvedBy: string

  @Column({ name: 'approved_at', type: 'timestamp', nullable: true })
  approvedAt: Date

  @Column({ name: 'created_by', nullable: true })
  createdBy: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date

  @ManyToOne(() => Project, (project) => project.budgets, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'project_id' })
  project: Project

  @ManyToOne(() => BudgetCategory)
  @JoinColumn({ name: 'category_id' })
  category: BudgetCategory

  @ManyToOne(() => User)
  @JoinColumn({ name: 'approved_by' })
  approver: User

  @ManyToOne(() => User)
  @JoinColumn({ name: 'created_by' })
  creator: User
}