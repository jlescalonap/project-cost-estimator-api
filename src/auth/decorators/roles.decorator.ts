import { SetMetadata } from '@nestjs/common';
import { Role } from '@prisma/client';

export const ROLES_KEY = 'roles';

/**
 * Decorator to enforce Role-Based Access Control (RBAC).
 * Attaches the required roles to the route metadata.
 *
 * @param {...Role[]} roles - The list of roles allowed to access the endpoint.
 * @example
 * // Only Admin can access
 * @Roles(Role.ADMIN)
 *
 * // Admin or Freelancer can access
 * @Roles(Role.ADMIN, Role.FREELANCER)
 */
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
