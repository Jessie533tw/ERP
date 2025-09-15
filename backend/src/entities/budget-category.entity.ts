import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm'
import { ProjectBudget } from './project-budget.entity'

@Entity('budget_categories')
export class BudgetCategory {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ length: 100 })
  name: string

  @Column({ length: 20, unique: true })
  code: string

  @Column({ name: 'parent_id', nullable: true })
  parentId: string

  @Column({ default: 1 })
  level: number

  @Column({ name: 'is_active', default: true })
  isActive: boolean

  @ManyToOne(() => BudgetCategory)
  @JoinColumn({ name: 'parent_id' })
  parent: BudgetCategory

  @OneToMany(() => BudgetCategory, (category) => category.parent)
  children: BudgetCategory[]

  @OneToMany(() => ProjectBudget, (budget) => budget.category)
  budgets: ProjectBudget[]
}