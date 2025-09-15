import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm'
import { Quotation } from './quotation.entity'
import { InquiryItem } from './inquiry-item.entity'

@Entity('quotation_items')
export class QuotationItem {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ name: 'quotation_id' })
  quotationId: string

  @Column({ name: 'inquiry_item_id', nullable: true })
  inquiryItemId: string

  @Column({ name: 'unit_price', type: 'decimal', precision: 12, scale: 2, nullable: true })
  unitPrice: number

  @Column({ name: 'total_price', type: 'decimal', precision: 15, scale: 2, nullable: true })
  totalPrice: number

  @Column({ name: 'delivery_period', nullable: true })
  deliveryPeriod: number

  @Column({ type: 'text', nullable: true })
  notes: string

  @ManyToOne(() => Quotation, (quotation) => quotation.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'quotation_id' })
  quotation: Quotation

  @ManyToOne(() => InquiryItem)
  @JoinColumn({ name: 'inquiry_item_id' })
  inquiryItem: InquiryItem
}