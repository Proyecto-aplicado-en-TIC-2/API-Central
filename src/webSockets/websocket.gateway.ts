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
import { jwtConstants } from 'src/auth/constants';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { IncidentsService } from 'src/incidents/incidents.service';
import { WebsocketService } from './websocket.service';
import { AdminActiveDto, ReportDto } from './websocket.dto';
import { Incident } from 'src/incidents/dto/create-incident.dto';
import { plainToInstance } from 'class-transformer';
import { GenericError } from 'src/helpers/GenericError';
import { UpdateIncident } from 'src/incidents/dto/update-incident.dto';

@WebSocketGateway({ namespace: '/WebSocketGateway' })
@UseGuards(AuthGuard, AuthorizationGuard) // Aplicar los guards aquí

export class WebsocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
    private readonly incidentsService: IncidentsService,
    private readonly websocketService: WebsocketService
  ) { }
  @WebSocketServer()
  server: Server;

  async handleConnection(client: Socket) {
    try {
      const token = this.extractTokenFromHeader(client);
      if (!token) {
        client.disconnect(); 
        return;
      }

      const user = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
      client['user'] = user;
      console.log('Client connected:', client.id, 'User:', user);
      // Verificar si el usuario es admin
      if (user.roles.includes(Role.Administration)) {
        const adminActiveDto = new AdminActiveDto(
          client.id,
          user.id
        )
        if (!await this.websocketService.GetAdminActive(adminActiveDto)) {
          await this.websocketService.CreateAdminActive(adminActiveDto);
        } await this.websocketService.PatchAdminActive(adminActiveDto);

        console.log('Admin connected:', adminActiveDto);
      } 
      client.emit('Connexion_Exitosa', 'Coneccion exitosa');

    } catch (e) {
      console.log('Authentication error:', e);
      client.disconnect(); // Desconectar si falla la autenticación
    }
  }

  extractTokenFromHeader(client: Socket): string | undefined {
    const [type, token] = client.handshake.headers.authorization?.split(' ') ?? [];
    console.log("WebSocket Token:", token);
    return type === 'Bearer' ? token : undefined;
  }

  async handleDisconnect(client: Socket) {
    console.log('Client disconnected:', client.id);
  }

  @SubscribeMessage('report')
  @Roles(Role.APH, Role.Administration, Role.Brigadiers, Role.UPBCommunity) 
  async handleReport(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
    const user = client['user']; 
   
    try {
      //creamos el incidente
      const incident_obj: Incident = plainToInstance(Incident, data);
      const inicdent: UpdateIncident = await this.incidentsService
        .CreateIncident(incident_obj);
      //creamos el reporte de seguimiento
      const now = new Date();
      const date = now.toISOString().split('T')[0]; 
      const time = now.toISOString().split('T')[1].split('.')[0]; 
      const report: ReportDto = {
        id: inicdent.id,
        WebSocket_id_attendant: client.id,
        brigadista_Id: "",
        reporter_Id: user.id,
        aphThatTakeCare_Id: "",
        partition_key: incident_obj.partition_key, 
        State: "en_proceso",
        date: {
          date: date,
          hourRequest: time, 
          hourArrive: "",
          hourCloseAttentionn: "",
        },
      };
      await this.websocketService.CreateReport(report)

      const admin_lisening: AdminActiveDto = await this.websocketService
        .GetAdminActiveByPartitionKey()

      const adminListeningEmit = (this.server?.sockets as any)
        .get(admin_lisening.WebSocket_id_admin_active)


      adminListeningEmit.emit('Reporte_Resivido', inicdent)
      client.emit('Mensaje_Enviado', 'Su reporte a sido enviado con extio' );


    } catch (error) {
      throw new GenericError('handleReport', error);
    }
  }



  @SubscribeMessage('Brigadiers')
  @Roles(Role.Brigadiers, Role.Administration) // Usar roles para permisos específicos
  async handleBrigadiers(@MessageBody() data: any, @ConnectedSocket() client: Socket) {

    client.emit('individualResponse_Brigadiers', '1');
    console.log('Report data:', data);

  }

  @SubscribeMessage('APH')
  @Roles(Role.APH, Role.Administration) // Usar roles para permisos específicos
  async handleAPH(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
    console.log('Report data:', data);
    client.emit('individualResponse_', { message: 'This is a private message to APH', data });
  }


}
