import { UnauthorizedException } from '@nestjs/common';
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { Roles } from 'src/authorization/decorators/roles.decorator';
import { Role } from '../authorization/role.enum';

@WebSocketGateway({ namespace: '/WebSocketGateway' })
export class WebsocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private readonly jwtService: JwtService) {}

  async handleConnection(client: Socket) {
    const token = client.handshake.headers['authorization'];
    if (!token) {
      client.disconnect(true);
      return;
    }

    try {
      const payload = await this.jwtService.verifyAsync(token.split(' ')[1]);
      client.data.user = payload; // Guardar la información del usuario en el cliente
      console.log(payload)
    } catch (e) {
      client.disconnect(true);
      console.log(new UnauthorizedException('Invalid token'))
    }
  }

  async handleDisconnect(client: Socket) {
    console.log(`Client Disconnect: ${client.id}`);
  }

  @SubscribeMessage('report')
  async handleReport(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
    console.log(data);
    console.log(`Message received from client: ${client.id}`);
    client.emit('individualResponse', { message: 'This is a private message', data });
  }

  @Roles(Role.Brigadiers)
  @SubscribeMessage('brigadista')
  async handleBrigadista(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
    if (!this.hasRole(client, Role.Brigadiers)) {
      throw new UnauthorizedException('User does not have Brigadiers role');
    }

    console.log(data);
    client.emit('individualResponse', { message: 'This is a private message for Brigadiers', data });
  }

  @Roles(Role.APH)
  @SubscribeMessage('aph')
  async handleAph(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
    if (!this.hasRole(client, Role.APH)) {
      throw new UnauthorizedException('User does not have APH role');
    }

    console.log(data);
    client.emit('individualResponse', { message: 'This is a private message for APH', data });
  }

  private hasRole(client: Socket, role: Role): boolean {
    return client.data.user?.roles?.includes(role);
  }
}
