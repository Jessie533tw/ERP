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
import { ProjectsService } from './projects.service'
import { CreateProjectDto } from './dto/create-project.dto'
import { UpdateProjectDto, UpdateProjectStatusDto } from './dto/update-project.dto'
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard'
import { RequirePermissions } from '@/common/decorators/permissions.decorator'
import { PermissionsGuard } from '@/common/guards/permissions.guard'
import { CurrentUser } from '@/common/decorators/current-user.decorator'

@ApiTags('專案管理')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @Get()
  @RequirePermissions('project:read')
  @ApiOperation({ summary: '取得專案列表' })
  @ApiResponse({ status: 200, description: '取得成功' })
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 20,
    @Query('status') status?: string,
    @Query('managerId') managerId?: string,
    @Query('search') search?: string,
  ) {
    const filters = { status, managerId, search }
    return this.projectsService.findAll(page, limit, filters)
  }

  @Get('stats')
  @RequirePermissions('project:read')
  @ApiOperation({ summary: '取得專案統計' })
  @ApiResponse({ status: 200, description: '取得成功' })
  async getStats() {
    return this.projectsService.getProjectStats()
  }

  @Get(':id')
  @RequirePermissions('project:read')
  @ApiOperation({ summary: '取得專案詳情' })
  @ApiResponse({ status: 200, description: '取得成功' })
  @ApiResponse({ status: 404, description: '專案不存在' })
  async findOne(@Param('id') id: string) {
    return this.projectsService.findOne(id)
  }

  @Get(':id/budget-summary')
  @RequirePermissions('project:read')
  @ApiOperation({ summary: '取得專案預算摘要' })
  @ApiResponse({ status: 200, description: '取得成功' })
  async getBudgetSummary(@Param('id') id: string) {
    return this.projectsService.getBudgetSummary(id)
  }

  @Post()
  @RequirePermissions('project:create')
  @ApiOperation({ summary: '建立專案' })
  @ApiResponse({ status: 201, description: '建立成功' })
  @ApiResponse({ status: 400, description: '資料驗證失敗' })
  async create(
    @Body() createProjectDto: CreateProjectDto,
    @CurrentUser() user: any,
  ) {
    return this.projectsService.create(createProjectDto, user.id)
  }

  @Put(':id')
  @RequirePermissions('project:update')
  @ApiOperation({ summary: '更新專案' })
  @ApiResponse({ status: 200, description: '更新成功' })
  @ApiResponse({ status: 404, description: '專案不存在' })
  async update(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    return this.projectsService.update(id, updateProjectDto)
  }

  @Put(':id/status')
  @RequirePermissions('project:update')
  @ApiOperation({ summary: '更新專案狀態' })
  @ApiResponse({ status: 200, description: '更新成功' })
  async updateStatus(
    @Param('id') id: string,
    @Body() updateStatusDto: UpdateProjectStatusDto,
  ) {
    return this.projectsService.updateStatus(id, updateStatusDto.status)
  }

  @Delete(':id')
  @RequirePermissions('project:delete')
  @ApiOperation({ summary: '刪除專案' })
  @ApiResponse({ status: 200, description: '刪除成功' })
  @ApiResponse({ status: 404, description: '專案不存在' })
  async remove(@Param('id') id: string) {
    return this.projectsService.delete(id)
  }
}