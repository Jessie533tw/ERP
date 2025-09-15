import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm'
import { User } from './user.entity'

@Entity('audit_logs')
export class AuditLog {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ name: 'user_id', nullable: true })
  userId: string

  @Column({ length: 50 })
  action: string

  @Column({ name: 'entity_type', length: 50 })
  entityType: string

  @Column({ name: 'entity_id', nullable: true })
  entityId: string

  @Column({ name: 'old_values', type: 'jsonb', nullable: true })
  oldValues: Record<string, any>

  @Column({ name: 'new_values', type: 'jsonb', nullable: true })
  newValues: Record<string, any>

  @Column({ name: 'ip_address', type: 'inet', nullable: true })
  ipAddress: string

  @Column({ name: 'user_agent', type: 'text', nullable: true })
  userAgent: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @ManyToOne(() => User, (user) => user.auditLogs)
  @JoinColumn({ name: 'user_id' })
  user: User
}