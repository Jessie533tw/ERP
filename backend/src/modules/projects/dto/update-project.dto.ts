import { IsString, IsOptional, IsDate, IsNumber, IsObject, IsEnum } from 'class-validator'
import { Type } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger'
import { ProjectStatus } from '@/entities/project.entity'

export class UpdateProjectDto {
  @ApiProperty({ description: '專案名稱', required: false })
  @IsOptional()
  @IsString()
  name?: string

  @ApiProperty({ description: '專案描述', required: false })
  @IsOptional()
  @IsString()
  description?: string

  @ApiProperty({ description: '客戶名稱', required: false })
  @IsOptional()
  @IsString()
  clientName?: string

  @ApiProperty({ description: '客戶聯絡資訊', required: false })
  @IsOptional()
  @IsObject()
  clientContact?: any

  @ApiProperty({ description: '專案經理 ID', required: false })
  @IsOptional()
  @IsString()
  projectManagerId?: string

  @ApiProperty({ description: '開始日期', required: false })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  startDate?: Date

  @ApiProperty({ description: '預期結束日期', required: false })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  expectedEndDate?: Date

  @ApiProperty({ description: '實際結束日期', required: false })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  actualEndDate?: Date

  @ApiProperty({ description: '總預算', required: false })
  @IsOptional()
  @IsNumber()
  totalBudget?: number

  @ApiProperty({ description: '專案地點', required: false })
  @IsOptional()
  @IsString()
  location?: string
}

export class UpdateProjectStatusDto {
  @ApiProperty({ description: '專案狀態', enum: ProjectStatus })
  @IsEnum(ProjectStatus)
  status: ProjectStatus
}