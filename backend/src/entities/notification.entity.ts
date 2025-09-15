import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm'
import { User } from './user.entity'

export enum NotificationType {
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error',
  SUCCESS = 'success',
}

export enum NotificationCategory {
  BUDGET_ALERT = 'budget_alert',
  DEADLINE_REMINDER = 'deadline_reminder',
  APPROVAL_REQUIRED = 'approval_required',
  QUOTATION_RECEIVED = 'quotation_received',
  PROGRESS_UPDATE = 'progress_update',
  SYSTEM = 'system',
}

@Entity('notifications')
export class Notification {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ name: 'recipient_id' })
  recipientId: string

  @Column({ length: 200 })
  title: string

  @Column({ type: 'text', nullable: true })
  content: string

  @Column({
    type: 'enum',
    enum: NotificationType,
    nullable: true,
  })
  type: NotificationType

  @Column({
    type: 'enum',
    enum: NotificationCategory,
    nullable: true,
  })
  category: NotificationCategory

  @Column({ name: 'entity_type', length: 50, nullable: true })
  entityType: string

  @Column({ name: 'entity_id', nullable: true })
  entityId: string

  @Column({ name: 'is_read', default: false })
  isRead: boolean

  @Column({ name: 'sent_via', type: 'jsonb', default: '["web"]' })
  sentVia: string[]

  @Column({ name: 'read_at', type: 'timestamp', nullable: true })
  readAt: Date

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'recipient_id' })
  recipient: User
}