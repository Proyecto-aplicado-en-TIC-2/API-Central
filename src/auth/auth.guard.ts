import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { Request } from 'express';
import { IS_PUBLIC_KEY } from './decorators/public.decorator';
import { Reflector } from '@nestjs/core';
import { Socket } from 'socket.io';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    // Verifica si es una conexión HTTP o WebSocket
    const request = this.getRequest(context);

    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      console.log('verificando token');
      const user = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
      request['user'] = user;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(
    request: Request | Socket,
  ): string | undefined {
    if ('headers' in request) {
      // Es una petición HTTP
      const [type, token] = request.headers.authorization?.split(' ') ?? [];
      return type === 'Bearer' ? token : undefined;
    } else if ('handshake' in request) {
      // Es una conexión WebSocket
      const [type, token] =
        request.handshake.headers.authorization?.split(' ') ?? [];
      return type === 'Bearer' ? token : undefined;
    }
    return undefined;
  }

  private getRequest(context: ExecutionContext): Request | Socket {
    // Determina si el contexto es HTTP o WebSocket
    if (context.getType() === 'http') {
      return context.switchToHttp().getRequest();
    } else if (context.getType() === 'ws') {
      return context.switchToWs().getClient();
    }
  }
}
