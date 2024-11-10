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
import { jwtConstants } from 'src/auth/constants';
import { JwtService } from '@nestjs/jwt';
import { InitializeOnPreviewAllowlist, Reflector } from '@nestjs/core';
import { IncidentsService } from 'src/incidents/incidents.service';
import { WebsocketService } from './websocket.service';
import { AphCases, PayLoadDto, ReportDto, UserWebsocketInfo } from './websocket.dto';
import { Incident, Priorty } from 'src/incidents/dto/create-incident.dto';
import { plainToInstance } from 'class-transformer';
import { GenericError, GenericErrorWebsockets } from 'src/helpers/GenericError';
import { UpdateIncident } from 'src/incidents/dto/update-incident.dto';
import { PrehospitalCareService } from 'src/prehospital_care/prehospital_care.service';
import { Auth, AuthDto } from 'src/auth/models/auth.models';
import { BrigadiersService } from 'src/brigadiers/brigadiers.service';
import { EmergencyReports } from 'src/emergency-reports/dto/create-emergency-reports.dto';
import { EmergencyReportsService } from 'src/emergency-reports/emergency-reports.service';
import { CommunityService } from 'src/community/community.service';
import { Community } from 'src/community/models/community.model';
import { AuthService } from 'src/auth/auth.service';
import { AuthRepository } from 'src/auth/repositories/auth.repository';
import { APH } from 'src/prehospital_care/models/aph.model';
import { isNull } from 'util';
import { isEmpty } from 'rxjs';
import { Brigadier } from 'src/brigadiers/models/brigadiers.model';
import { UpdateBrigadiersDto } from 'src/brigadiers/dto/update-brigadiers.dto';

@WebSocketGateway({
  namespace: '/WebSocketGateway',
  cors: {
    origin: '*', // Asegúrate de permitir cualquier origen
    methods: ['GET', 'POST'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  },
  transports: ['websocket', 'polling'], // Acepta tanto websocket como polling
})
@UseGuards(AuthGuard, AuthorizationGuard) // Aplicar los guards aquí
export class WebsocketGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
    private readonly incidentsService: IncidentsService,
    private readonly websocketService: WebsocketService,
    private readonly prehospitalCareService: PrehospitalCareService,
    private readonly brigadiersService: BrigadiersService,
    private readonly emergencyReportsService: EmergencyReportsService,
    private readonly communityService: CommunityService
  ) {}
  @WebSocketServer()
  server: Server;


  async handleConnection(client: Socket) {
    console.log('Intentando conectar cliente...'); // Log adicional
    try {
      const token = this.extractTokenFromHeader(client);
      if (!token) {
        console.log('No se encontró token, desconectando cliente.');
        console.log(token);
        client.disconnect();
        return;
      }

      const user = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });


      client['user'] = user;
      console.log('Cliente autenticado:', user);

      const userWebsocketInfo : UserWebsocketInfo = {
        id: user.id,
        partition_key: user.roles,
        webSocketId: client.id,
        cuadrant: null,
        inService: false
      }

      const Info: UserWebsocketInfo = 
        await this.websocketService.CreatetWebsocketInfo(userWebsocketInfo)
        console.log('Cliente guarado correctamente:', Info);

      client.emit('Connexion_Exitosa', 'Coneccion exitosa');
    } catch (e) {
      console.log('Authentication error:', e);
      client.disconnect(); // Desconectar si falla la autenticación
    }
  }

  async handleDisconnect(client: Socket) {
    try{
      const user = client['user'];
      console.log('handleDisconnect: ' + user);
      if(user == null || user.isEmpty){
        client.disconnect();
      }else{
        const operation : boolean = 
        await this.websocketService.DeleteWebsocketInfo(user.id, user.roles);
        if(operation){
          console.log('Client disconnected:', client.id);
          client.disconnect();
        }else{
          console.log('Client disconnected pero no se elimino de la db:', client.id);
          client.disconnect();
        }
      }
    }catch(e){
        new GenericErrorWebsockets('handleDisconnect', e);
    }
    
  }
  //-----------------------------------------------------------------------------
  @SubscribeMessage('report')
  @Roles(Role.APH, Role.Administration, Role.Brigadiers, Role.UPBCommunity)
  async handleReport(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket,
  ) {
    const user = client['user'];
    console.log(data);

    try {
      //creamos el incidente
      const incident_obj: Incident = plainToInstance(Incident, data);
      let user_info
      
      if(this.isAPH(client)){
        console.log('es aph')
        user_info =  await this.prehospitalCareService.GetAPHById(user.id);
      }else if(this.isBrigadiers(client)){
        console.log('es brigadisa')
        user_info =  await this.brigadiersService.GetBrigadierById(user.id);
      }else if(this.isUser(client)){
        console.log('es usuario')
        user_info =  await this.communityService.GetCommunityUserById(user.id);
      }else{
        console.log('es admin o algo salio mal')
        user_info = undefined;
      }
      console.log(user_info)
      incident_obj.reporter = {
        id: user.id,
        names: user_info.names,
        lastNames: user_info.last_names,
        relationshipWithTheUniversity: user_info.relationshipWithTheUniversity,
        roles: user.roles
      }
      console.log('incident_obj actualizado');
      console.log(incident_obj);
      const inicdent: UpdateIncident =
        await this.incidentsService.CreateIncident(incident_obj);
      console.log('UpdateIncident good');
      //creamos el reporte de seguimiento
      const now = new Date();
      const date = now.toISOString().split('T')[0];
      const time = now.toISOString().split('T')[1].split('.')[0];
      const report: ReportDto = {
        id: inicdent.id,
        WebSocket_id_attendant: client.id,
        brigadista_Id: '',
        reporter_Id: user.id,
        aphThatTakeCare_Id: '',
        partition_key: incident_obj.partition_key,
        State: 'en_proceso',
        date: {
          date: date,
          hourRequest: time,
          hourArrive: '',
          hourCloseAttentionn: '',
        },
      };
      console.log('report update good');
      console.log(report)
      await this.websocketService.CreateReport(report);

      //
      client.emit('Mensaje_Enviado', 'Su reporte a sido enviado con extio');
      this.AdminEmit('Reporte_Resivido', inicdent);
      
    } catch (error) {
      throw new GenericError('handleReport', error);
    }
  }

  @SubscribeMessage('Brigadiers')
  @Roles(Role.Brigadiers, Role.Administration, Role.APH) // Usar roles para permisos específicos
  async handleBrigadiers(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket,
  ) {
    try {
      if (this.isAdmin(client)) {
        //--------------actualizar el reporte con el nuevo id ----------
        const case_data: PayLoadDto = plainToInstance(PayLoadDto, data);
        //obtener el reporte
        const search_report: ReportDto =
          await this.websocketService.GetReportById(
            case_data.case_id,
            case_data.partition_key,
          );

        search_report.brigadista_Id = case_data.user_id;

        await this.websocketService.PatchReport(search_report);
        console.log('PatchReport good');
        //enviar data
        const incident: UpdateIncident =
          await this.incidentsService.GetIncidentById(
            search_report.id,
            search_report.partition_key,
          );
        console.log('UpdateIncident good');
        const aph_id_confirm: ReportDto = await this.websocketService
          .GetReportById(case_data.case_id, case_data.partition_key);
        const brigadiers_assigned: Brigadier = await this.brigadiersService
          .GetBrigadierById(case_data.user_id);
        this.EmitById(aph_id_confirm.aphThatTakeCare_Id, 'Brigadista_case_assigned', {

          names: brigadiers_assigned.names,
          lastNames: brigadiers_assigned.last_names,
          phone_number: brigadiers_assigned.phone_number,
          case_id: case_data.case_id
        }  )
        this.EmitById(case_data.user_id, 'Brigadista_case', {
          message:
            'Se le a asignado como colavorador de un caso a un aph, dirijirse inmediatamente a : ',
          Lugar: incident.location,
          Id_reporte: case_data.case_id,
          partition_key: case_data.partition_key,
          priority: incident.priority,
          Reporter: incident.reporter
        });
        console.log('se pidio alludam a un brigadista');
      }else{
        
        const user = client['user']
        console.log(data.in_service);
        console.log(data);
  
        const brigadierDetails: Brigadier = await this.brigadiersService
          .GetBrigadierById(user.id)
        brigadierDetails.in_service = data.in_service;
        await this.brigadiersService
          .UpdateBrigadiersById(
            brigadierDetails.id, 
            plainToInstance(UpdateBrigadiersDto, brigadierDetails)
          )
        this.AdminEmit("Brigadier_update_state", {
            in_service: data.in_service,
           brigadier_id: brigadierDetails.id })
        client.emit('Brigadier_update_state_confirmation',{in_service: data.in_service});
        
      }
    } catch (error) {
      throw new GenericError('handleBrigadiers', error);
    }
  }

  @SubscribeMessage('APH')
  @Roles(Role.APH, Role.Administration) // Usar roles para permisos específicos
  async handleAPH(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
    try {
      console.log('se entro a aph');
      if (this.isAdmin(client)) {
        console.log('es un admin adentro de aph');
        //--------------actualizar el reporte con el nuevo id ----------
        const case_data: PayLoadDto = plainToInstance(PayLoadDto, data);
        console.log('PayLoadDto aph good');
        //obtener el reporte
        let search_report: ReportDto =
          await this.websocketService.GetReportById(
            case_data.case_id,
            case_data.partition_key,
          );
          console.log('search_report aph good');
        //asignar el aph a cargo
        console.log(case_data.user_id)
        console.log(search_report)

        search_report = Object.assign(search_report, {
          aphThatTakeCare_Id: case_data.user_id
        });
        console.log('aphThatTakeCare_Id = user_id good');
        console.log(search_report);
        await this.websocketService.PatchReport(search_report);
        console.log('PatchReport good');
        //enviar data
        const incident: UpdateIncident =
          await this.incidentsService.GetIncidentById(
            search_report.id,
            search_report.partition_key,
          );

        console.log('UpdateIncident good');
        this.EmitById(case_data.user_id, 'APH_case', {
          message:
            'Se le a asignado un caso',
          Lugar: incident.location,
          Id_reporte: case_data.case_id,
          partition_key: case_data.partition_key,
          Priorty: incident.priority,
          Reporter: incident.reporter
        });

        const APH_info: APH = await this.prehospitalCareService.GetAPHById(case_data.user_id);
        this.EmitById(incident.reporter.id, 'Report_assign', {
          APH_name: `${APH_info.names} ${APH_info.last_names}`,
          APH_phone: APH_info.phone_number,
          APH_time: '10'
        });

      } else {
        console.log('no es admin, se evaluan casos');
        let aph_actions: AphCases = plainToInstance(AphCases, data);
        console.log(aph_actions);

        if (aph_actions.close_case == 'true' && aph_actions.on_the_way == 'false') {
          const search_report: ReportDto =
            await this.websocketService.GetReportById(
              aph_actions.help.case_id,
              aph_actions.help.partition_key,
            );

          const now = new Date();
          const time = now.toISOString().split('T')[1].split('.')[0];
          search_report.date.hourArrive = aph_actions.hourArrive;
          search_report.date.hourCloseAttentionn = time;
          search_report.State = 'close';

          //obtener el reporte cerrado

          const report_close: ReportDto =
            await this.websocketService.PatchReport(search_report);

          //se crea el reporte completo con los datos obyenidos y misma id

          const incident: Incident =
            await this.incidentsService.GetIncidentById(
              report_close.id,
              report_close.partition_key,
            );

          const reporter: Community =
            await this.communityService.GetCommunityUserById(
              report_close.reporter_Id,
            );
            
            // Agregar o actualizar campos en `aph_actions` con nuevos datos
            aph_actions = Object.assign(aph_actions, {
              whatIsHappening: incident.whatIsHappening,
              affected: incident.affected,
              id: report_close.id,
              partition_key: report_close.partition_key,
              date: report_close.date,
              location: {
                block: incident.location.block,
                classroom: incident.location.classroom,
                pointOfReference: incident.location.pointOfReference,
              },
              reporter: {
                names: reporter.names,
                lastNames: reporter.last_names,
                relationshipWithTheUniversity: reporter.relationshipWithTheUniversity,
              },
              aphThatTakeCare: report_close.aphThatTakeCare_Id,
            });
          const full_informe: EmergencyReports = plainToInstance(EmergencyReports, aph_actions)
          const full_inform_incert: EmergencyReports =
            await this.emergencyReportsService.CreateEmergencyReport(
              full_informe,
            );
          console.log('----------full_inform_incert actualizado----------');
          console.log(full_inform_incert);

          //enviar mensaje de que se cerro el incidente
          await this.AdminEmit('Close_incident_broadcast', {
            message: 'incidente cerrado',
            incident_id: report_close.id,
          });
          console.log('se envio al admin');
           client.emit('close_case', 'Caso cerrado correctamente');
          console.log('se envio al aph');
          if (report_close.brigadista_Id) {
            await this.EmitById(
              report_close.brigadista_Id,
              'Close_incident_broadcast',
              { Message: 'incidente cerrado', id_incidente: report_close.id },
            );
            console.log('se envio al brigadista');
          }
          await this.EmitById(
            report_close.reporter_Id,
            'Close_incident_broadcast',
            { Message: 'incidente cerrado', id_incidente: report_close.id },
          );
          console.log('se envio al reporter');

          console.log('caso cerrado correctmante');
        } else if(aph_actions.close_case == 'false' && aph_actions.on_the_way == 'false'){
          client.emit('Aph_help_confirm', 'A pedido ayuda correctamente')
          this.AdminEmit('Aph_help', {
            message: 'Un ahp necesita alluda con un caso',
            case_info: aph_actions.help,
          });
          console.log('aph pide alluda');
        }else{
          const case_info_user : Incident = await this.incidentsService
            .GetIncidentById(aph_actions.help.case_id, aph_actions.help.partition_key)
            client.emit('on_the_way_aph', 'En camino!!!');
          this.EmitById(case_info_user.reporter.id, 'on_the_way', true);
        }
      }
    } catch (error) {
      throw new GenericError('handleAPH', error);
    }
  }

  @SubscribeMessage('GlovalWarning')
  @Roles(Role.Administration) // Usar roles para permisos específicos
  async handleGlovalWarning(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket,
  ) {
    this.server.emit('GlovalWarning', {
      message:
        'Atencion!, esto no es un simulacro, porfavor seguir ' +
        'los protocolos de seguridad y evacuacion de manera inmedaiata',
      data,
    });
  }
  //-----------------------------------------------------------------------------
  /**
   * emite un mensaje hacia la persona conectada haciendo uso de su id de usaurio
   */
  async EmitById(id: string, eventName: string, data: any) {
    try {
        const websocketInfo:  UserWebsocketInfo =
        await this.websocketService.GetWebsocketInfo(id);
      if (websocketInfo) {
        // Obtiene el WebSocket_id 
        const listeningEmit: any = await (this.server?.sockets as any).get(
          websocketInfo.webSocketId,
        );
        await listeningEmit.emit(eventName, data);
      
      } else  {
          //new Error('La persona no existe o no esta conectada'); // Corrige aquí
        console.log('🟪','El Socket con el id=',id,'No existe 💀💀💀')

      }
    } catch (e) {
      new GenericErrorWebsockets('EmitById', e)
    }
   
  }
  /**
   * event emit hacia el admin conectado, si no esta coenctado error
   */

  async AdminEmit(eventName: string, data: any) {

    try{
        const websocketInfo:  UserWebsocketInfo =
        await this.websocketService.GetWebsocketInfoAdmin();
      if(websocketInfo){
        const adminListeningEmit = await (this.server?.sockets as any).get(
          websocketInfo.webSocketId,
        );
        adminListeningEmit.emit(eventName, data);
      }else{
        console.log('🟪','El Socket para admin no esta conectado 💀💀💀')
      }
    }catch(e){
       new GenericErrorWebsockets('AdminEmit', e)
    }
  }

  /**
   * devuelve true si es Administration
   * falso si no es Administration
   */
  isAdmin(client: Socket): boolean {
    const user = client['user'];
    console.log('User object:', user.roles);
    if (user.roles == Role.Administration || user.roles == 'user') {
      // el user es temporal
      return true;
    }
    return false;
  }

  isAPH(client: Socket): boolean {
    const user = client['user'];
    console.log('User object:', user.roles);
    if (user.roles == Role.APH) {
      // el user es temporal
      return true;
    }
    return false;
  }

  isBrigadiers(client: Socket): boolean {
    const user = client['user'];
    console.log('User object:', user.roles);
    if (user.roles == Role.Brigadiers) {
      // el user es temporal
      return true;
    }
    return false;
  }

  isUser(client: Socket): boolean {
    const user = client['user'];
    console.log('User object:', user.roles);
    if (user.roles == Role.UPBCommunity) {
      // el user es temporal
      return true;
    }
    return false;
  }
  extractTokenFromHeader(client: Socket): string | undefined {
    if (client.handshake.headers.cookie?.match(/token=([^;]+)/)?.[1]) {
      console.log('Encavezados de la peticion', client.handshake.headers);
      return client.handshake.headers.cookie?.match(/token=([^;]+)/)?.[1];
    }

    console.log('Encavezados de la peticion', client.handshake.headers);
    const [type, token] =
    client.handshake.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
