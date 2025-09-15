import { IsString, IsEmail, IsOptional, IsArray } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class UpdateUserDto {
  @ApiProperty({ description: '信箱', required: false })
  @IsOptional()
  @IsEmail()
  email?: string

  @ApiProperty({ description: '姓名', required: false })
  @IsOptional()
  @IsString()
  fullName?: string

  @ApiProperty({ description: '部門', required: false })
  @IsOptional()
  @IsString()
  department?: string

  @ApiProperty({ description: '職位', required: false })
  @IsOptional()
  @IsString()
  position?: string

  @ApiProperty({ description: '角色 ID 列表', required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  roleIds?: string[]
}