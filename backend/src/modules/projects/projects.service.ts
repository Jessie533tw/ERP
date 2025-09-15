import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, EntityManager, MoreThan, LessThan } from 'typeorm'
import { Project, ProjectStatus } from '@/entities/project.entity'
import { ProjectBudget } from '@/entities/project-budget.entity'

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
    @InjectRepository(ProjectBudget)
    private budgetRepository: Repository<ProjectBudget>,
    private entityManager: EntityManager,
  ) {}

  async findAll(page: number = 1, limit: number = 20, filters?: any) {
    const queryBuilder = this.projectRepository
      .createQueryBuilder('project')
      .leftJoinAndSelect('project.projectManager', 'manager')
      .leftJoinAndSelect('project.creator', 'creator')

    if (filters?.status) {
      queryBuilder.andWhere('project.status = :status', { status: filters.status })
    }

    if (filters?.managerId) {
      queryBuilder.andWhere('project.projectManagerId = :managerId', {
        managerId: filters.managerId
      })
    }

    if (filters?.search) {
      queryBuilder.andWhere(
        '(project.name ILIKE :search OR project.projectCode ILIKE :search)',
        { search: `%${filters.search}%` }
      )
    }

    const [data, total] = await queryBuilder
      .skip((page - 1) * limit)
      .take(limit)
      .orderBy('project.createdAt', 'DESC')
      .getManyAndCount()

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    }
  }

  async findOne(id: string): Promise<Project> {
    const project = await this.projectRepository
      .createQueryBuilder('project')
      .leftJoinAndSelect('project.projectManager', 'manager')
      .leftJoinAndSelect('project.creator', 'creator')
      .leftJoinAndSelect('project.budgets', 'budgets')
      .leftJoinAndSelect('budgets.category', 'category')
      .where('project.id = :id', { id })
      .getOne()

    if (!project) {
      throw new NotFoundException('專案不存在')
    }

    return project
  }

  async create(projectData: {
    name: string
    description?: string
    clientName?: string
    clientContact?: any
    projectManagerId?: string
    startDate?: Date
    expectedEndDate?: Date
    totalBudget?: number
    location?: string
  }, createdBy: string) {
    return this.entityManager.transaction(async (manager) => {
      const projectCode = await this.generateProjectCode()

      const project = manager.create(Project, {
        ...projectData,
        projectCode,
        createdBy,
      })

      const savedProject = await manager.save(project)

      return savedProject
    })
  }

  async update(id: string, updateData: {
    name?: string
    description?: string
    clientName?: string
    clientContact?: any
    projectManagerId?: string
    startDate?: Date
    expectedEndDate?: Date
    actualEndDate?: Date
    totalBudget?: number
    location?: string
  }) {
    const project = await this.findOne(id)

    Object.assign(project, updateData)

    return this.projectRepository.save(project)
  }

  async updateStatus(id: string, status: ProjectStatus) {
    const project = await this.findOne(id)

    project.status = status

    if (status === ProjectStatus.COMPLETED && !project.actualEndDate) {
      project.actualEndDate = new Date()
    }

    return this.projectRepository.save(project)
  }

  async delete(id: string) {
    const project = await this.findOne(id)

    await this.projectRepository.remove(project)

    return { success: true, message: '專案已刪除' }
  }

  async getBudgetSummary(projectId: string) {
    const result = await this.budgetRepository
      .createQueryBuilder('budget')
      .select([
        'SUM(budget.approvedAmount) as totalApproved',
        'SUM(budget.usedAmount) as totalUsed',
        'COUNT(*) as totalItems'
      ])
      .where('budget.projectId = :projectId', { projectId })
      .andWhere('budget.status = :status', { status: 'approved' })
      .getRawOne()

    const totalApproved = parseFloat(result.totalApproved || 0)
    const totalUsed = parseFloat(result.totalUsed || 0)
    const remaining = totalApproved - totalUsed
    const usagePercentage = totalApproved > 0 ? (totalUsed / totalApproved) * 100 : 0

    return {
      totalApproved,
      totalUsed,
      remaining,
      usagePercentage: Math.round(usagePercentage * 100) / 100,
      totalItems: parseInt(result.totalItems || 0)
    }
  }

  async getProjectStats() {
    const totalProjects = await this.projectRepository.count()

    const statusStats = await this.projectRepository
      .createQueryBuilder('project')
      .select('project.status', 'status')
      .addSelect('COUNT(*)', 'count')
      .groupBy('project.status')
      .getRawMany()

    const stats = statusStats.reduce((acc, stat) => {
      acc[stat.status] = parseInt(stat.count)
      return acc
    }, {})

    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    const recentProjects = await this.projectRepository.count({
      where: {
        createdAt: MoreThan(thirtyDaysAgo),
      },
    })

    const overdueProjects = await this.projectRepository.count({
      where: {
        status: ProjectStatus.ACTIVE,
        expectedEndDate: LessThan(new Date()),
      },
    })

    return {
      totalProjects,
      ...stats,
      recentProjects,
      overdueProjects,
    }
  }

  private async generateProjectCode(): Promise<string> {
    const currentYear = new Date().getFullYear()
    const prefix = `P${currentYear}`

    const lastProject = await this.projectRepository
      .createQueryBuilder('project')
      .where('project.projectCode LIKE :prefix', { prefix: `${prefix}%` })
      .orderBy('project.projectCode', 'DESC')
      .getOne()

    let sequence = 1
    if (lastProject) {
      const lastSequence = parseInt(lastProject.projectCode.substring(5))
      sequence = lastSequence + 1
    }

    return `${prefix}${sequence.toString().padStart(4, '0')}`
  }
}