import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { IncidentsService } from './incidents.service';
import { Cases, Incident } from './dto/create-incident.dto';
import { plainToInstance } from 'class-transformer';
import { GenericError } from 'src/helpers/GenericError';
import { UpdateIncident } from './dto/update-incident.dto';
import { Roles } from 'src/authorization/decorators/roles.decorator';
import { Role } from 'src/authorization/role.enum';
import { WebsocketService } from 'src/webSockets/websocket.service';

@Controller('incidents')
export class IncidentsController {
  public constructor(
    private readonly incidentsService: IncidentsService,
    private readonly websocketService: WebsocketService
  ) {}


  
  @Roles(Role.Administration, Role.APH, Role.Brigadiers)
  @Get('/IncidentIdsById/:id')
  async GetIncidentIdsById(@Param('id') id: string): Promise<Incident[]>{
    const ids: string[] = await this.websocketService.GetReportsIdsById(id)
    return await this.incidentsService.GetIncidentsFromList(ids);
  }

  @Roles(Role.Administration, Role.UPBCommunity, Role.APH, Role.Brigadiers)
  @Post()
  async CreateIncident(@Body() incident: Record<string, any>): Promise<any> {
    try {
      const incident_obj: Incident = plainToInstance(Incident, incident);
      return await this.incidentsService.CreateIncident(incident_obj);
    } catch (error) {
      throw new GenericError('CreateIncident', error);
    }
  }

  @Roles(Role.Administration)
  @Post('/IncidentsFromList')
  async GetIncidentsFromList(@Body() ids: string[]) {
    try {
      return await this.incidentsService.GetIncidentsFromList(ids);
    } catch (error) {
      throw new GenericError('Get incidents of the day', error);
    }
  }

  @Roles(Role.Administration)
  @Get()
  async GetAllIncidents(): Promise<any> {
    const incidents: Incident[] = await this.incidentsService.GetAllIncidents();
    return incidents;
  }
  @Roles(Role.Administration)
  @Get('/:Id/:partition_key')
  async GetIncidentById(
    @Param('Id') Id: string,
    @Param('partition_key') partition_key: Cases,
  ): Promise<any> {
    try {
      const incidents: Incident = await this.incidentsService.GetIncidentById(
        Id,
        partition_key,
      );
      return incidents;
    } catch (error) {
      throw new GenericError('GetIncidentById', error);
    }
  }
  @Roles(Role.Administration)
  @Delete('/:Id/:partition_key')
  async DeleteIncidentByID(
    @Param('Id') Id: string,
    @Param('partition_key') partition_key: Cases,
  ): Promise<any> {
    try {
      const incidents: Incident =
        await this.incidentsService.DeleteIncidentByID(Id, partition_key);

      return `The Incident was deleted succefully: ${incidents}`;
    } catch (error) {
      throw new GenericError('DeleteIncident', error);
    }
  }
  @Roles(Role.Administration)
  @Patch()
  async UpdateIncident(
    @Body() updateIncident: Record<string, any>,
  ): Promise<any> {
    try {
      const incident_obj: UpdateIncident = plainToInstance(
        UpdateIncident,
        updateIncident,
      );
      const operation: UpdateIncident =
        await this.incidentsService.UpdateIncident(incident_obj);

      return (
        'Incidente actualizado correctamente: ' + JSON.stringify(operation)
      );
    } catch (error) {
      throw new GenericError('UpdateIncident', error);
    }
  }
}
