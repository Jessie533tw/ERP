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
import { Inquiry } from './inquiry.entity'
import { Vendor } from './vendor.entity'
import { QuotationItem } from './quotation-item.entity'
import { PurchaseOrder } from './purchase-order.entity'

export enum QuotationStatus {
  DRAFT = 'draft',
  SUBMITTED = 'submitted',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
  EXPIRED = 'expired',
}

@Entity('quotations')
export class Quotation {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ name: 'quotation_number', unique: true, length: 50 })
  quotationNumber: string

  @Column({ name: 'inquiry_id' })
  inquiryId: string

  @Column({ name: 'vendor_id' })
  vendorId: string

  @Column({ name: 'total_amount', type: 'decimal', precision: 15, scale: 2, nullable: true })
  totalAmount: number

  @Column({ name: 'delivery_period', nullable: true })
  deliveryPeriod: number

  @Column({ name: 'validity_period', nullable: true })
  validityPeriod: number

  @Column({ name: 'payment_terms', type: 'text', nullable: true })
  paymentTerms: string

  @Column({ type: 'text', nullable: true })
  notes: string

  @Column({
    type: 'enum',
    enum: QuotationStatus,
    default: QuotationStatus.DRAFT,
  })
  status: QuotationStatus

  @Column({ name: 'submitted_at', type: 'timestamp', nullable: true })
  submittedAt: Date

  @Column({ type: 'jsonb', default: '[]' })
  attachments: Record<string, any>[]

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date

  @ManyToOne(() => Inquiry, (inquiry) => inquiry.quotations, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'inquiry_id' })
  inquiry: Inquiry

  @ManyToOne(() => Vendor, (vendor) => vendor.quotations, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'vendor_id' })
  vendor: Vendor

  @OneToMany(() => QuotationItem, (item) => item.quotation)
  items: QuotationItem[]

  @OneToMany(() => PurchaseOrder, (purchaseOrder) => purchaseOrder.quotation)
  purchaseOrders: PurchaseOrder[]
}