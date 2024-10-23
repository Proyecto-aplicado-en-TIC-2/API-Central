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
import { AdminActiveDto, AphCases, PayLoadDto, ReportDto } from './websocket.dto';
import { Incident } from 'src/incidents/dto/create-incident.dto';
import { plainToInstance } from 'class-transformer';
import { GenericError } from 'src/helpers/GenericError';
import { UpdateIncident } from 'src/incidents/dto/update-incident.dto';
import { isUndefined } from 'util';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { Console, error } from 'console';
import { promises } from 'dns';
import { PrehospitalCareService } from 'src/prehospital_care/prehospital_care.service';
import { APH } from 'src/prehospital_care/models/aph.model';
import { AuthDto } from 'src/auth/models/auth.models';
import { audit, isEmpty } from 'rxjs';
import { AuthService } from 'src/auth/auth.service';
import { BrigadiersService } from 'src/brigadiers/brigadiers.service';
import { Brigadier } from 'src/brigadiers/models/brigadiers.model';

@WebSocketGateway({ namespace: '/WebSocketGateway' })
@UseGuards(AuthGuard, AuthorizationGuard) // Aplicar los guards aquí

export class WebsocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
    private readonly incidentsService: IncidentsService,
    private readonly websocketService: WebsocketService,
    private readonly prehospitalCareService: PrehospitalCareService,
    private readonly brigadiersService: BrigadiersService
  ) { }
  @WebSocketServer()
  server: Server;
  /**
  * Key: string = user.id 
  * Value: string = cliente.id 
  */
  hashMap_users_conected: Map<string, string> = new Map();
  admiSaved: AuthDto = null;

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
      const user_auth: AuthDto = plainToInstance(AuthDto, user)
      this.hashMap_users_conected.set(user.id, client.id)
      if (this.isAdmin(client)) {
        this.admiSaved = user_auth
        console.log(`es admin: ${JSON.stringify(user_auth)}`)
      } else {
        console.log(`no es admin: ${JSON.stringify(user_auth)}`)
      }

      client.emit('Connexion_Exitosa', 'Coneccion exitosa');

    } catch (e) {
      console.log('Authentication error:', e);
      client.disconnect(); // Desconectar si falla la autenticación
    }
  }

  async handleDisconnect(client: Socket) {
    console.log('Client disconnected:', client.id);
  }
  //-----------------------------------------------------------------------------
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

      this.AdminEmit('Reporte_Resivido', inicdent)
      client.emit('Mensaje_Enviado', 'Su reporte a sido enviado con extio');


    } catch (error) {
      throw new GenericError('handleReport', error);
    }
  }

  @SubscribeMessage('Brigadiers')
  @Roles(Role.Brigadiers, Role.Administration) // Usar roles para permisos específicos
  async handleBrigadiers(@MessageBody() data: any, @ConnectedSocket() client: Socket) {

    try {
      if (this.isAdmin(client)) {
        //--------------actualizar el reporte con el nuevo id ----------
        const case_data: PayLoadDto =
          plainToInstance(PayLoadDto, data)
        //obtener el reporte
        const search_report: ReportDto = await this.websocketService
        .GetReportById(case_data.case_id,
                        case_data.partition_key)

        search_report.brigadista_Id = case_data.user_id;

        await this.websocketService.PatchReport(search_report)
        console.log("PatchReport good")
        //enviar data 
        const incident: UpdateIncident = await this.incidentsService
        .GetIncidentById(search_report.id, search_report.partition_key);

        console.log("UpdateIncident good")
        this.EmitById(case_data.user_id, 'Brigadista_case', {
          message: 'Se le a asignado como colavorador de un caso a un aph, dirijirse inmediatamente a : ',
          Lugar: incident.location,
          Id_reporte: case_data.case_id,
        });
        console.log('se pidio alludam a un brigadista')
      }
    }catch (error) {
      throw new GenericError('handleReport', error);
    }
    

  }

  @SubscribeMessage('APH')
  @Roles(Role.APH, Role.Administration) // Usar roles para permisos específicos
  async handleAPH(@MessageBody() data: any, @ConnectedSocket() client: Socket) {


    try {
      console.log('se entro a aph')
      if (this.isAdmin(client)) {
        //--------------actualizar el reporte con el nuevo id ----------
        const case_data: PayLoadDto =
          plainToInstance(PayLoadDto, data)
        //obtener el reporte
        const search_report: ReportDto = await this.websocketService
          .GetReportById(case_data.case_id,
                         case_data.partition_key)
        //asignar el aph a cargo
        search_report.aphThatTakeCare_Id =  case_data.user_id
        
        await this.websocketService.PatchReport(search_report)
        console.log("PatchReport good")
        //enviar data 
        const incident: UpdateIncident = await this.incidentsService
          .GetIncidentById(search_report.id, search_report.partition_key);

        console.log("UpdateIncident good")
        this.EmitById(case_data.user_id, 'APH_case', {
          message: 'Se le a asignado un caso, por favor dirijirse inmediatmentea : ',
          Lugar: incident.location,
          Id_reporte: case_data.case_id,
        });

      }else{
        console.log('no es admin, se evaluan casos')
        const aph_actions: AphCases = plainToInstance(AphCases, data);
        console.log(aph_actions)

        if(aph_actions.close_case == "true"){
          
          const search_report: ReportDto = await this.websocketService
          .GetReportById(aph_actions.help.case_id,
                          aph_actions.help.partition_key)
  
          const now = new Date();
          const time = now.toISOString().split('T')[1].split('.')[0];
          search_report.date.hourArrive = aph_actions.hourArrive;
          search_report.date.hourCloseAttentionn = time;
          search_report.State = 'close;'
  
          //enviar data 
          const incident: UpdateIncident = await this.incidentsService
          .GetIncidentById(search_report.id, search_report.partition_key);
  
          this.AdminEmit('Close_incident', {message: 'incidente cerrado',
            incident_id: incident.id})
          console.log('caso cerrado correctmante')
  
        }
        this.AdminEmit('Aph_help', {message: 'Un ahp necesita alluda con un caso',
                                    case_info: aph_actions.help})
        console.log('aph pide alluda')
                                    
      }



    } catch (error) {
      throw new GenericError('handleReport', error);
    }
  }

  @SubscribeMessage('GlovalWarning')
  @Roles(Role.Administration) // Usar roles para permisos específicos
  async handleGlovalWarning(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
    
  }
 //-----------------------------------------------------------------------------
  /**
  * emite un mensaje hacia la persona conectada haciendo uso de su id de usaurio
  */
  async EmitById(id: string, eventName: string, data: any) {

    // Obtiene el WebSocket_id del mapa
    const WebSocket_id: string = this.hashMap_users_conected.get(id);

    if (WebSocket_id === undefined) {
      new Error("La persona no existe o no esta conectada"); // Corrige aquí
    }
    const adminListeningEmit = (this.server?.sockets as any).get(WebSocket_id);
    adminListeningEmit.emit(eventName, data);
  }
  /**
  * event emit hacia el admin conectado, si no esta coenctado error
  */
  AdminEmit(eventName: string, data: any) {

    const WebSocket_id: string =
      this.hashMap_users_conected.get(this.admiSaved.id)
    console.log(WebSocket_id);

    const adminListeningEmit = (this.server?.sockets as any)
      .get(WebSocket_id);
    
      this.hashMap_users_conected.forEach((value, key) => {
        console.log(`Clave: ${key}, Valor: ${value}`);
      });

    adminListeningEmit.emit(eventName, data);
  }
  /**
  * devuelve true si es Administration
  * falso si no es Administration
  */
  isAdmin(client: Socket): boolean {
    const user = client['user'];
    console.log('User object:', user.roles);
    if (user.roles == Role.Administration) {
      return true;
    }
    return false;
  }
  extractTokenFromHeader(client: Socket): string | undefined {
    const [type, token] = client.handshake.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
