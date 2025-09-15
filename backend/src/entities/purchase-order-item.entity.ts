import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm'
import { PurchaseOrder } from './purchase-order.entity'
import { QuotationItem } from './quotation-item.entity'
import { ProjectBudget } from './project-budget.entity'

export enum PurchaseOrderItemStatus {
  PENDING = 'pending',
  PARTIAL = 'partial',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

@Entity('purchase_order_items')
export class PurchaseOrderItem {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ name: 'po_id' })
  poId: string

  @Column({ name: 'quotation_item_id', nullable: true })
  quotationItemId: string

  @Column({ name: 'budget_item_id', nullable: true })
  budgetItemId: string

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  quantity: number

  @Column({ name: 'unit_price', type: 'decimal', precision: 12, scale: 2, nullable: true })
  unitPrice: number

  @Column({ name: 'total_price', type: 'decimal', precision: 15, scale: 2, nullable: true })
  totalPrice: number

  @Column({ name: 'delivered_quantity', type: 'decimal', precision: 10, scale: 2, default: 0 })
  deliveredQuantity: number

  @Column({
    type: 'enum',
    enum: PurchaseOrderItemStatus,
    default: PurchaseOrderItemStatus.PENDING,
  })
  status: PurchaseOrderItemStatus

  @ManyToOne(() => PurchaseOrder, (purchaseOrder) => purchaseOrder.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'po_id' })
  purchaseOrder: PurchaseOrder

  @ManyToOne(() => QuotationItem)
  @JoinColumn({ name: 'quotation_item_id' })
  quotationItem: QuotationItem

  @ManyToOne(() => ProjectBudget)
  @JoinColumn({ name: 'budget_item_id' })
  budgetItem: ProjectBudget
}