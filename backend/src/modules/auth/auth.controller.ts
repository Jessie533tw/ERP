import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Request,
  HttpCode,
  HttpStatus,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { LoginDto } from './dto/login.dto'
import { Public } from '@/common/decorators/public.decorator'
import { CurrentUser } from '@/common/decorators/current-user.decorator'

@ApiTags('認證')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(AuthGuard('local'))
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '使用者登入' })
  @ApiResponse({ status: 200, description: '登入成功' })
  @ApiResponse({ status: 401, description: '認證失敗' })
  async login(@Request() req, @Body() loginDto: LoginDto) {
    return this.authService.login(req.user, loginDto.mfaToken)
  }

  @ApiBearerAuth()
  @Get('profile')
  @ApiOperation({ summary: '取得使用者資料' })
  @ApiResponse({ status: 200, description: '取得成功' })
  getProfile(@CurrentUser() user) {
    return user
  }

  @ApiBearerAuth()
  @Post('refresh')
  @ApiOperation({ summary: '刷新 Token' })
  @ApiResponse({ status: 200, description: '刷新成功' })
  async refreshToken(@CurrentUser() user) {
    return this.authService.refreshToken(user.id)
  }

  @ApiBearerAuth()
  @Post('setup-mfa')
  @ApiOperation({ summary: '設定二步驟驗證' })
  @ApiResponse({ status: 200, description: '設定成功' })
  async setupMfa(@CurrentUser() user) {
    return this.authService.setupMfa(user.id)
  }

  @ApiBearerAuth()
  @Post('enable-mfa')
  @ApiOperation({ summary: '啟用二步驟驗證' })
  @ApiResponse({ status: 200, description: '啟用成功' })
  async enableMfa(@CurrentUser() user, @Body('token') token: string) {
    return this.authService.enableMfa(user.id, token)
  }

  @ApiBearerAuth()
  @Post('disable-mfa')
  @ApiOperation({ summary: '停用二步驟驗證' })
  @ApiResponse({ status: 200, description: '停用成功' })
  async disableMfa(@CurrentUser() user) {
    return this.authService.disableMfa(user.id)
  }
}