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
import { Incident } from './dto/create-incident.dto';
import { plainToInstance } from 'class-transformer';
import { GenericError } from 'src/helpers/GenericError';
import { UpdateIncident } from './dto/update-incident.dto';

@Controller('incidents')
export class IncidentsController {
  public constructor(private readonly incidentsService: IncidentsService) {}

  @Post()
  async CreateIncident(@Body() incident: Record<string, any>): Promise<any> {
    try {
      const incident_obj: Incident = plainToInstance(Incident, incident);
      return await this.incidentsService.CreateIncident(incident_obj);
    } catch (error) {
      throw new GenericError('CreateIncident', error);
    }
  }
  @Get()
  async GetAllIncidents(): Promise<any> {
    const incidents: Incident[] = await this.incidentsService.GetAllIncidents();
    return incidents;
  }

  @Get('/:Id')
  async GetIncidentById(@Param('Id') Id: string): Promise<any> {
    try {
      const incidents: Incident =
        await this.incidentsService.GetIncidentById(Id);
      return incidents;
    } catch (error) {
      throw new GenericError('GetIncidentById', error);
    }
  }

  @Delete('/:Id')
  async DeleteIncidentByID(@Param('Id') Id: string): Promise<any> {
    try {
      const incidents: Incident =
        await this.incidentsService.DeleteIncidentByID(Id);

      return `The Incident was deleted succefully: ${incidents}`;
    } catch (error) {
      throw new GenericError('DeleteIncident', error);
    }
  }
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
