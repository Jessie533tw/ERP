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
import { InquiryItem } from './inquiry-item.entity'
import { Quotation } from './quotation.entity'
import { User } from './user.entity'

export enum InquiryStatus {
  DRAFT = 'draft',
  SENT = 'sent',
  CLOSED = 'closed',
  CANCELLED = 'cancelled',
}

@Entity('inquiries')
export class Inquiry {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ name: 'inquiry_number', unique: true, length: 50 })
  inquiryNumber: string

  @Column({ name: 'project_id' })
  projectId: string

  @Column({ length: 200 })
  title: string

  @Column({ type: 'text', nullable: true })
  description: string

  @Column({ type: 'jsonb', nullable: true })
  specifications: Record<string, any>

  @Column({ type: 'date', nullable: true })
  deadline: Date

  @Column({
    type: 'enum',
    enum: InquiryStatus,
    default: InquiryStatus.DRAFT,
  })
  status: InquiryStatus

  @Column({ default: 1 })
  version: number

  @Column({ name: 'parent_inquiry_id', nullable: true })
  parentInquiryId: string

  @Column({ type: 'jsonb', default: '[]' })
  attachments: Record<string, any>[]

  @Column({ name: 'created_by', nullable: true })
  createdBy: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date

  @ManyToOne(() => Project, (project) => project.inquiries, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'project_id' })
  project: Project

  @ManyToOne(() => Inquiry)
  @JoinColumn({ name: 'parent_inquiry_id' })
  parentInquiry: Inquiry

  @OneToMany(() => Inquiry, (inquiry) => inquiry.parentInquiry)
  childInquiries: Inquiry[]

  @ManyToOne(() => User)
  @JoinColumn({ name: 'created_by' })
  creator: User

  @OneToMany(() => InquiryItem, (item) => item.inquiry)
  items: InquiryItem[]

  @OneToMany(() => Quotation, (quotation) => quotation.inquiry)
  quotations: Quotation[]
}