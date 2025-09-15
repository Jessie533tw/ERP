import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToMany,
} from 'typeorm'
import { User } from './user.entity'

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ unique: true, length: 50 })
  name: string

  @Column({ type: 'text', nullable: true })
  description: string

  @Column({ type: 'jsonb', default: '[]' })
  permissions: string[]

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @ManyToMany(() => User, (user) => user.roles)
  users: User[]
}