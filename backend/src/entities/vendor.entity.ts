import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm'
import { Quotation } from './quotation.entity'
import { PurchaseOrder } from './purchase-order.entity'

@Entity('vendors')
export class Vendor {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ name: 'company_name', length: 200 })
  companyName: string

  @Column({ name: 'business_number', length: 50, unique: true, nullable: true })
  businessNumber: string

  @Column({ name: 'contact_person', length: 100, nullable: true })
  contactPerson: string

  @Column({ length: 20, nullable: true })
  phone: string

  @Column({ length: 100, nullable: true })
  email: string

  @Column({ type: 'text', nullable: true })
  address: string

  @Column({ length: 200, nullable: true })
  website: string

  @Column({ name: 'credit_rating', default: 5 })
  creditRating: number

  @Column({ name: 'specialty_categories', type: 'jsonb', default: '[]' })
  specialtyCategories: string[]

  @Column({ name: 'is_qualified', default: true })
  isQualified: boolean

  @Column({ name: 'qualification_documents', type: 'jsonb', default: '[]' })
  qualificationDocuments: Record<string, any>[]

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date

  @OneToMany(() => Quotation, (quotation) => quotation.vendor)
  quotations: Quotation[]

  @OneToMany(() => PurchaseOrder, (purchaseOrder) => purchaseOrder.vendor)
  purchaseOrders: PurchaseOrder[]
}