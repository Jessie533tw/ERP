import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { PERMISSIONS_KEY } from '../decorators/permissions.decorator'

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()]
    )

    if (!requiredPermissions) {
      return true
    }

    const { user } = context.switchToHttp().getRequest()

    if (!user) {
      throw new ForbiddenException('使用者未認證')
    }

    const userPermissions = this.extractUserPermissions(user)

    const hasPermission = requiredPermissions.every(permission => {
      return userPermissions.includes('*') ||
             userPermissions.includes(permission) ||
             this.checkWildcardPermission(permission, userPermissions)
    })

    if (!hasPermission) {
      throw new ForbiddenException('權限不足')
    }

    return true
  }

  private extractUserPermissions(user: any): string[] {
    const permissions = []

    if (user.roles) {
      for (const role of user.roles) {
        if (role.permissions) {
          permissions.push(...role.permissions)
        }
      }
    }

    return [...new Set(permissions)]
  }

  private checkWildcardPermission(permission: string, userPermissions: string[]): boolean {
    const [resource, action] = permission.split(':')

    return userPermissions.some(userPerm => {
      if (userPerm === '*') return true

      const [userResource, userAction] = userPerm.split(':')

      if (userResource === resource && userAction === '*') return true

      return false
    })
  }
}