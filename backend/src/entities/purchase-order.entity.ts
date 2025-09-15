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
import { Vendor } from './vendor.entity'
import { Quotation } from './quotation.entity'
import { PurchaseOrderItem } from './purchase-order-item.entity'
import { User } from './user.entity'

export enum PurchaseOrderStatus {
  DRAFT = 'draft',
  SENT = 'sent',
  CONFIRMED = 'confirmed',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

@Entity('purchase_orders')
export class PurchaseOrder {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ name: 'po_number', unique: true, length: 50 })
  poNumber: string

  @Column({ name: 'project_id' })
  projectId: string

  @Column({ name: 'vendor_id' })
  vendorId: string

  @Column({ name: 'quotation_id', nullable: true })
  quotationId: string

  @Column({ name: 'total_amount', type: 'decimal', precision: 15, scale: 2, nullable: true })
  totalAmount: number

  @Column({
    type: 'enum',
    enum: PurchaseOrderStatus,
    default: PurchaseOrderStatus.DRAFT,
  })
  status: PurchaseOrderStatus

  @Column({ name: 'payment_terms', type: 'text', nullable: true })
  paymentTerms: string

  @Column({ name: 'delivery_address', type: 'text', nullable: true })
  deliveryAddress: string

  @Column({ name: 'expected_delivery_date', type: 'date', nullable: true })
  expectedDeliveryDate: Date

  @Column({ name: 'actual_delivery_date', type: 'date', nullable: true })
  actualDeliveryDate: Date

  @Column({ type: 'text', nullable: true })
  notes: string

  @Column({ name: 'created_by', nullable: true })
  createdBy: string

  @Column({ name: 'approved_by', nullable: true })
  approvedBy: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date

  @ManyToOne(() => Project, (project) => project.purchaseOrders, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'project_id' })
  project: Project

  @ManyToOne(() => Vendor, (vendor) => vendor.purchaseOrders, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'vendor_id' })
  vendor: Vendor

  @ManyToOne(() => Quotation, (quotation) => quotation.purchaseOrders)
  @JoinColumn({ name: 'quotation_id' })
  quotation: Quotation

  @ManyToOne(() => User)
  @JoinColumn({ name: 'created_by' })
  creator: User

  @ManyToOne(() => User)
  @JoinColumn({ name: 'approved_by' })
  approver: User

  @OneToMany(() => PurchaseOrderItem, (item) => item.purchaseOrder)
  items: PurchaseOrderItem[]
}