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
import { Project } from './project.entity'
import { PurchaseOrder } from './purchase-order.entity'
import { User } from './user.entity'

export enum ProgressStatus {
  NOT_STARTED = 'not_started',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  DELAYED = 'delayed',
  BLOCKED = 'blocked',
}

@Entity('project_progress')
export class ProjectProgress {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ name: 'project_id' })
  projectId: string

  @Column({ name: 'po_id', nullable: true })
  poId: string

  @Column({ name: 'task_name', length: 200 })
  taskName: string

  @Column({ type: 'text', nullable: true })
  description: string

  @Column({ name: 'planned_start_date', type: 'date', nullable: true })
  plannedStartDate: Date

  @Column({ name: 'planned_end_date', type: 'date', nullable: true })
  plannedEndDate: Date

  @Column({ name: 'actual_start_date', type: 'date', nullable: true })
  actualStartDate: Date

  @Column({ name: 'actual_end_date', type: 'date', nullable: true })
  actualEndDate: Date

  @Column({ name: 'progress_percentage', default: 0 })
  progressPercentage: number

  @Column({
    type: 'enum',
    enum: ProgressStatus,
    default: ProgressStatus.NOT_STARTED,
  })
  status: ProgressStatus

  @Column({ type: 'jsonb', default: '[]' })
  dependencies: string[]

  @Column({ name: 'assigned_to', nullable: true })
  assignedTo: string

  @Column({ name: 'parent_task_id', nullable: true })
  parentTaskId: string

  @Column({ name: 'sort_order', default: 0 })
  sortOrder: number

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date

  @ManyToOne(() => Project, (project) => project.progressRecords, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'project_id' })
  project: Project

  @ManyToOne(() => PurchaseOrder)
  @JoinColumn({ name: 'po_id' })
  purchaseOrder: PurchaseOrder

  @ManyToOne(() => User)
  @JoinColumn({ name: 'assigned_to' })
  assignee: User

  @ManyToOne(() => ProjectProgress)
  @JoinColumn({ name: 'parent_task_id' })
  parentTask: ProjectProgress

  @OneToMany(() => ProjectProgress, (progress) => progress.parentTask)
  subTasks: ProjectProgress[]
}