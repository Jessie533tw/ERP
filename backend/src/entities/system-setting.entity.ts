import {
  Entity,
  PrimaryColumn,
  Column,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm'
import { User } from './user.entity'

@Entity('system_settings')
export class SystemSetting {
  @PrimaryColumn({ length: 100 })
  key: string

  @Column({ type: 'jsonb' })
  value: Record<string, any>

  @Column({ type: 'text', nullable: true })
  description: string

  @Column({ length: 50, nullable: true })
  category: string

  @Column({ name: 'updated_by', nullable: true })
  updatedBy: string

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date

  @ManyToOne(() => User)
  @JoinColumn({ name: 'updated_by' })
  updater: User
}