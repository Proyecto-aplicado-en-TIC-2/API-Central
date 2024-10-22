import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { AuthorizationGuard } from 'src/authorization/authorization.guard';
import { Roles } from 'src/authorization/decorators/roles.decorator';
import { Role } from 'src/authorization/role.enum';
import { Public } from 'src/auth/decorators/public.decorator';

@WebSocketGateway({ namespace: '/WebSocketGateway' })
@UseGuards(AuthGuard, AuthorizationGuard) // Aplicar los guards aquí
export class WebsocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  async handleConnection(client: Socket) {
    console.log('Client connected:', client.id);
    
  }
  

  async handleDisconnect(client: Socket) {
    console.log('Client disconnected:', client.id);
  }

  @SubscribeMessage('report')
  @Public() // Usar roles para permisos específicos
  async handleReport(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
    console.log('Report data:', data);
    client.emit('individualResponse', { message: 'This is a private message to report', data });
  }
  
  @SubscribeMessage('Brigadiers')
  @Roles(Role.Brigadiers) // Usar roles para permisos específicos
  async handleBrigadiers(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
    console.log('Report data:', data);
    client.emit('individualResponse', { message: 'This is a private message to Brigadiers', data });
  }
  @SubscribeMessage('APH')
  @Roles(Role.APH) // Usar roles para permisos específicos
  async handleAPH(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
    console.log('Report data:', data);
    client.emit('individualResponse', { message: 'This is a private message to APH', data });
  }

  
}
