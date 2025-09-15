import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm'
import { Role } from './role.entity'
import { Project } from './project.entity'
import { AuditLog } from './audit-log.entity'

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ unique: true, length: 50 })
  username: string

  @Column({ unique: true, length: 100 })
  email: string

  @Column({ name: 'password_hash', length: 255, select: false })
  passwordHash: string

  @Column({ name: 'full_name', length: 100 })
  fullName: string

  @Column({ length: 20, nullable: true })
  phone: string

  @Column({ length: 50, nullable: true })
  department: string

  @Column({ length: 50, nullable: true })
  position: string

  @Column({ name: 'is_active', default: true })
  isActive: boolean

  @Column({ name: 'mfa_enabled', default: false })
  mfaEnabled: boolean

  @Column({ name: 'mfa_secret', length: 32, nullable: true, select: false })
  mfaSecret: string

  @Column({ name: 'last_login_at', type: 'timestamp', nullable: true })
  lastLoginAt: Date

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date

  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable({
    name: 'user_roles',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'role_id', referencedColumnName: 'id' },
  })
  roles: Role[]

  @OneToMany(() => Project, (project) => project.projectManager)
  managedProjects: Project[]

  @OneToMany(() => AuditLog, (auditLog) => auditLog.user)
  auditLogs: AuditLog[]
}