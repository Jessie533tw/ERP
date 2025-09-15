import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from '@/entities/user.entity'
import * as bcrypt from 'bcrypt'
import * as speakeasy from 'speakeasy'
import * as qrcode from 'qrcode'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { username },
      relations: ['roles'],
      select: ['id', 'username', 'email', 'passwordHash', 'fullName', 'isActive', 'mfaEnabled'],
    })

    if (!user || !user.isActive) {
      return null
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash)
    if (!isPasswordValid) {
      return null
    }

    const { passwordHash, ...result } = user
    return result
  }

  async login(user: any, mfaToken?: string) {
    if (user.mfaEnabled) {
      if (!mfaToken) {
        return {
          requiresMfa: true,
          message: '請輸入二步驟驗證碼',
        }
      }

      const isValidMfa = await this.verifyMfaToken(user.id, mfaToken)
      if (!isValidMfa) {
        throw new UnauthorizedException('二步驟驗證碼無效')
      }
    }

    await this.userRepository.update(user.id, {
      lastLoginAt: new Date(),
    })

    const payload = {
      sub: user.id,
      username: user.username,
      roles: user.roles?.map(role => role.name) || [],
    }

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        fullName: user.fullName,
        roles: user.roles,
        permissions: this.extractPermissions(user.roles),
      },
    }
  }

  async setupMfa(userId: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } })
    if (!user) {
      throw new BadRequestException('使用者不存在')
    }

    const secret = speakeasy.generateSecret({
      name: `建設ERP (${user.email})`,
      issuer: '建設公司ERP',
      length: 32,
    })

    await this.userRepository.update(userId, {
      mfaSecret: secret.base32,
    })

    const qrCodeUrl = await qrcode.toDataURL(secret.otpauth_url)

    return {
      secret: secret.base32,
      qrCode: qrCodeUrl,
      manualEntryKey: secret.base32,
    }
  }

  async enableMfa(userId: string, token: string) {
    const isValid = await this.verifyMfaToken(userId, token)
    if (!isValid) {
      throw new BadRequestException('驗證碼無效')
    }

    await this.userRepository.update(userId, {
      mfaEnabled: true,
    })

    return { success: true, message: '二步驟驗證已啟用' }
  }

  async disableMfa(userId: string) {
    await this.userRepository.update(userId, {
      mfaEnabled: false,
      mfaSecret: null,
    })

    return { success: true, message: '二步驟驗證已停用' }
  }

  async verifyMfaToken(userId: string, token: string): Promise<boolean> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      select: ['mfaSecret'],
    })

    if (!user?.mfaSecret) {
      return false
    }

    return speakeasy.totp.verify({
      secret: user.mfaSecret,
      encoding: 'base32',
      token,
      window: 2,
    })
  }

  private extractPermissions(roles: any[]): string[] {
    if (!roles) return []

    const permissions = []
    for (const role of roles) {
      if (role.permissions) {
        permissions.push(...role.permissions)
      }
    }

    return [...new Set(permissions)]
  }

  async refreshToken(userId: string) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['roles'],
    })

    if (!user || !user.isActive) {
      throw new UnauthorizedException('使用者不存在或已停用')
    }

    const payload = {
      sub: user.id,
      username: user.username,
      roles: user.roles?.map(role => role.name) || [],
    }

    return {
      access_token: this.jwtService.sign(payload),
    }
  }
}