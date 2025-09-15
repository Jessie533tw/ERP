import { IsString, IsNotEmpty, IsOptional } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class LoginDto {
  @ApiProperty({ description: '使用者名稱' })
  @IsString()
  @IsNotEmpty()
  username: string

  @ApiProperty({ description: '密碼' })
  @IsString()
  @IsNotEmpty()
  password: string

  @ApiProperty({ description: 'MFA 驗證碼', required: false })
  @IsOptional()
  @IsString()
  mfaToken?: string
}