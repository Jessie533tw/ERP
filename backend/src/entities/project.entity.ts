import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm'
import { User } from './user.entity'
import { ProjectBudget } from './project-budget.entity'
import { Inquiry } from './inquiry.entity'
import { PurchaseOrder } from './purchase-order.entity'
import { ProjectProgress } from './project-progress.entity'

export enum ProjectStatus {
  PLANNING = 'planning',
  ACTIVE = 'active',
  SUSPENDED = 'suspended',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ name: 'project_code', unique: true, length: 50 })
  projectCode: string

  @Column({ length: 200 })
  name: string

  @Column({ type: 'text', nullable: true })
  description: string

  @Column({ name: 'client_name', length: 100, nullable: true })
  clientName: string

  @Column({ name: 'client_contact', type: 'jsonb', nullable: true })
  clientContact: Record<string, any>

  @Column({ name: 'project_manager_id', nullable: true })
  projectManagerId: string

  @Column({
    type: 'enum',
    enum: ProjectStatus,
    default: ProjectStatus.PLANNING,
  })
  status: ProjectStatus

  @Column({ name: 'start_date', type: 'date', nullable: true })
  startDate: Date

  @Column({ name: 'expected_end_date', type: 'date', nullable: true })
  expectedEndDate: Date

  @Column({ name: 'actual_end_date', type: 'date', nullable: true })
  actualEndDate: Date

  @Column({ name: 'total_budget', type: 'decimal', precision: 15, scale: 2, nullable: true })
  totalBudget: number

  @Column({ length: 200, nullable: true })
  location: string

  @Column({ type: 'jsonb', default: '{}' })
  metadata: Record<string, any>

  @Column({ name: 'created_by', nullable: true })
  createdBy: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date

  @ManyToOne(() => User, (user) => user.managedProjects)
  @JoinColumn({ name: 'project_manager_id' })
  projectManager: User

  @ManyToOne(() => User)
  @JoinColumn({ name: 'created_by' })
  creator: User

  @OneToMany(() => ProjectBudget, (budget) => budget.project)
  budgets: ProjectBudget[]

  @OneToMany(() => Inquiry, (inquiry) => inquiry.project)
  inquiries: Inquiry[]

  @OneToMany(() => PurchaseOrder, (purchaseOrder) => purchaseOrder.project)
  purchaseOrders: PurchaseOrder[]

  @OneToMany(() => ProjectProgress, (progress) => progress.project)
  progressRecords: ProjectProgress[]
}