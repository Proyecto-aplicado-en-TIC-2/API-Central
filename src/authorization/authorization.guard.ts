import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Role } from './role.enum';
import { ROLES_KEY } from './decorators/roles.decorator';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    try {
      const requiredRoles = this.reflector
        .getAllAndOverride<Role[]>(
          ROLES_KEY,[
          context.getHandler(), 
          context.getClass()
        ]);
      if (!requiredRoles) {
        return true;
      }

      const { user } = context.switchToHttp().getRequest();
      return requiredRoles.some((role) => user.roles?.includes(role));
    } catch (e) {
      throw new UnauthorizedException(e);
    }
  }
}
