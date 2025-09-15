import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, MoreThan } from 'typeorm'
import { User } from '@/entities/user.entity'
import { Role } from '@/entities/role.entity'
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async findAll(page: number = 1, limit: number = 20) {
    const [users, total] = await this.userRepository.findAndCount({
      relations: ['roles'],
      select: ['id', 'username', 'email', 'fullName', 'department', 'position', 'isActive', 'lastLoginAt', 'createdAt'],
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    })

    return {
      data: users,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    }
  }

  async findById(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['roles'],
    })

    if (!user) {
      throw new NotFoundException('使用者不存在')
    }

    return user
  }

  async findByUsername(username: string): Promise<User> {
    return this.userRepository.findOne({
      where: { username },
      relations: ['roles'],
    })
  }

  async create(userData: {
    username: string
    email: string
    password: string
    fullName: string
    department?: string
    position?: string
    roleIds?: string[]
  }) {
    const existingUser = await this.userRepository.findOne({
      where: [{ username: userData.username }, { email: userData.email }],
    })

    if (existingUser) {
      throw new BadRequestException('使用者名稱或信箱已存在')
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10)

    const user = this.userRepository.create({
      ...userData,
      passwordHash: hashedPassword,
    })

    if (userData.roleIds && userData.roleIds.length > 0) {
      const roles = await this.roleRepository.findByIds(userData.roleIds)
      user.roles = roles
    }

    const savedUser = await this.userRepository.save(user)

    const { passwordHash, ...result } = savedUser
    return result
  }

  async update(id: string, updateData: {
    email?: string
    fullName?: string
    department?: string
    position?: string
    roleIds?: string[]
  }) {
    const user = await this.findById(id)

    if (updateData.email && updateData.email !== user.email) {
      const existingUser = await this.userRepository.findOne({
        where: { email: updateData.email },
      })
      if (existingUser) {
        throw new BadRequestException('信箱已存在')
      }
    }

    Object.assign(user, updateData)

    if (updateData.roleIds) {
      const roles = await this.roleRepository.findByIds(updateData.roleIds)
      user.roles = roles
    }

    await this.userRepository.save(user)

    return this.findById(id)
  }

  async changePassword(id: string, newPassword: string) {
    const hashedPassword = await bcrypt.hash(newPassword, 10)

    await this.userRepository.update(id, {
      passwordHash: hashedPassword,
    })

    return { success: true, message: '密碼已更新' }
  }

  async toggleActiveStatus(id: string) {
    const user = await this.findById(id)

    await this.userRepository.update(id, {
      isActive: !user.isActive,
    })

    return { success: true, message: `使用者已${user.isActive ? '停用' : '啟用'}` }
  }

  async delete(id: string) {
    const user = await this.findById(id)

    await this.userRepository.remove(user)

    return { success: true, message: '使用者已刪除' }
  }

  async getAllRoles() {
    return this.roleRepository.find({
      select: ['id', 'name', 'description'],
      order: { name: 'ASC' },
    })
  }

  async getUserStats() {
    const totalUsers = await this.userRepository.count()
    const activeUsers = await this.userRepository.count({ where: { isActive: true } })
    const inactiveUsers = totalUsers - activeUsers

    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

    const recentlyLoggedIn = await this.userRepository.count({
      where: {
        lastLoginAt: MoreThan(sevenDaysAgo),
      },
    })

    return {
      totalUsers,
      activeUsers,
      inactiveUsers,
      recentlyLoggedIn,
    }
  }
}