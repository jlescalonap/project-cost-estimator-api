import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '@prisma/client';
import { ROLES_KEY } from '../decorators/roles.decorator';

/**
 * Guard that implements Role-Based Access Control (RBAC).
 *
 * It reads the roles defined by the `@Roles()` decorator and checks if the
 * authenticated user (attached to the request) possesses one of them.
 *
 * @remarks
 * This guard MUST be used after `AuthGuard('jwt')` (or similar) to ensure
 * `request.user` is populated.
 */
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // 1. Retrieve required roles from metadata (Handler > Class)
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // 2. If no roles are required, allow access (public for authorized users)
    if (!requiredRoles) {
      return true;
    }

    // 3. Get user from request (populated by JwtStrategy)
    const { user } = context.switchToHttp().getRequest();

    // 4. Validate role match
    return requiredRoles.some((role) => user.role === role);
  }
}
