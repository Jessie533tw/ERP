import { IsString, IsNotEmpty, IsOptional, IsDate, IsNumber, IsObject } from 'class-validator'
import { Type } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger'

export class CreateProjectDto {
  @ApiProperty({ description: '專案名稱' })
  @IsString()
  @IsNotEmpty()
  name: string

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

  @ApiProperty({ description: '總預算', required: false })
  @IsOptional()
  @IsNumber()
  totalBudget?: number

  @ApiProperty({ description: '專案地點', required: false })
  @IsOptional()
  @IsString()
  location?: string
}