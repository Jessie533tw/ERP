import { IsString, IsEmail, IsNotEmpty, IsOptional, IsArray, MinLength } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateUserDto {
  @ApiProperty({ description: '使用者名稱' })
  @IsString()
  @IsNotEmpty()
  username: string

  @ApiProperty({ description: '信箱' })
  @IsEmail()
  email: string

  @ApiProperty({ description: '密碼', minLength: 6 })
  @IsString()
  @MinLength(6)
  password: string

  @ApiProperty({ description: '姓名' })
  @IsString()
  @IsNotEmpty()
  fullName: string

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