import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard'
import { RequirePermissions } from '@/common/decorators/permissions.decorator'
import { PermissionsGuard } from '@/common/guards/permissions.guard'

@ApiTags('使用者管理')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @RequirePermissions('user:read')
  @ApiOperation({ summary: '取得使用者列表' })
  @ApiResponse({ status: 200, description: '取得成功' })
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 20,
  ) {
    return this.usersService.findAll(page, limit)
  }

  @Get('stats')
  @RequirePermissions('user:read')
  @ApiOperation({ summary: '取得使用者統計' })
  @ApiResponse({ status: 200, description: '取得成功' })
  async getStats() {
    return this.usersService.getUserStats()
  }

  @Get('roles')
  @RequirePermissions('user:read')
  @ApiOperation({ summary: '取得所有角色' })
  @ApiResponse({ status: 200, description: '取得成功' })
  async getRoles() {
    return this.usersService.getAllRoles()
  }

  @Get(':id')
  @RequirePermissions('user:read')
  @ApiOperation({ summary: '取得使用者詳情' })
  @ApiResponse({ status: 200, description: '取得成功' })
  @ApiResponse({ status: 404, description: '使用者不存在' })
  async findOne(@Param('id') id: string) {
    return this.usersService.findById(id)
  }

  @Post()
  @RequirePermissions('user:create')
  @ApiOperation({ summary: '建立使用者' })
  @ApiResponse({ status: 201, description: '建立成功' })
  @ApiResponse({ status: 400, description: '資料驗證失敗' })
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto)
  }

  @Put(':id')
  @RequirePermissions('user:update')
  @ApiOperation({ summary: '更新使用者' })
  @ApiResponse({ status: 200, description: '更新成功' })
  @ApiResponse({ status: 404, description: '使用者不存在' })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto)
  }

  @Put(':id/password')
  @RequirePermissions('user:update')
  @ApiOperation({ summary: '變更使用者密碼' })
  @ApiResponse({ status: 200, description: '更新成功' })
  async changePassword(
    @Param('id') id: string,
    @Body('password') password: string,
  ) {
    return this.usersService.changePassword(id, password)
  }

  @Put(':id/toggle-status')
  @RequirePermissions('user:update')
  @ApiOperation({ summary: '切換使用者啟用狀態' })
  @ApiResponse({ status: 200, description: '更新成功' })
  async toggleStatus(@Param('id') id: string) {
    return this.usersService.toggleActiveStatus(id)
  }

  @Delete(':id')
  @RequirePermissions('user:delete')
  @ApiOperation({ summary: '刪除使用者' })
  @ApiResponse({ status: 200, description: '刪除成功' })
  @ApiResponse({ status: 404, description: '使用者不存在' })
  async remove(@Param('id') id: string) {
    return this.usersService.delete(id)
  }
}