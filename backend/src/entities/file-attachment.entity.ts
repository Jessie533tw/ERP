import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm'
import { User } from './user.entity'

@Entity('file_attachments')
export class FileAttachment {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ length: 255 })
  filename: string

  @Column({ name: 'original_filename', length: 255 })
  originalFilename: string

  @Column({ name: 'file_path', length: 500 })
  filePath: string

  @Column({ name: 'file_size', type: 'bigint', nullable: true })
  fileSize: number

  @Column({ name: 'mime_type', length: 100, nullable: true })
  mimeType: string

  @Column({ name: 'file_hash', length: 64, nullable: true })
  fileHash: string

  @Column({ name: 'entity_type', length: 50, nullable: true })
  entityType: string

  @Column({ name: 'entity_id', nullable: true })
  entityId: string

  @Column({ default: 1 })
  version: number

  @Column({ name: 'parent_file_id', nullable: true })
  parentFileId: string

  @Column({ name: 'uploaded_by', nullable: true })
  uploadedBy: string

  @Column({ name: 'is_active', default: true })
  isActive: boolean

  @Column({ type: 'jsonb', default: '{}' })
  metadata: Record<string, any>

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @ManyToOne(() => FileAttachment)
  @JoinColumn({ name: 'parent_file_id' })
  parentFile: FileAttachment

  @OneToMany(() => FileAttachment, (file) => file.parentFile)
  versions: FileAttachment[]

  @ManyToOne(() => User)
  @JoinColumn({ name: 'uploaded_by' })
  uploader: User
}