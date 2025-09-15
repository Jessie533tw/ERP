import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm'
import { Inquiry } from './inquiry.entity'
import { BudgetCategory } from './budget-category.entity'

@Entity('inquiry_items')
export class InquiryItem {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ name: 'inquiry_id' })
  inquiryId: string

  @Column({ name: 'item_name', length: 200 })
  itemName: string

  @Column({ type: 'text', nullable: true })
  description: string

  @Column({ type: 'jsonb', nullable: true })
  specifications: Record<string, any>

  @Column({ length: 20, nullable: true })
  unit: string

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  quantity: number

  @Column({ name: 'estimated_unit_price', type: 'decimal', precision: 12, scale: 2, nullable: true })
  estimatedUnitPrice: number

  @Column({ name: 'category_id', nullable: true })
  categoryId: string

  @Column({ name: 'sort_order', default: 0 })
  sortOrder: number

  @ManyToOne(() => Inquiry, (inquiry) => inquiry.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'inquiry_id' })
  inquiry: Inquiry

  @ManyToOne(() => BudgetCategory)
  @JoinColumn({ name: 'category_id' })
  category: BudgetCategory
}