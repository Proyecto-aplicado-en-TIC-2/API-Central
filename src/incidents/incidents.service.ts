import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Cases, Incident } from './dto/create-incident.dto';
import { IIncidensRepostiory } from './incidets.interface';
import { AppValidationException } from 'src/helpers/AppValidationException';
import { UpdateIncident } from './dto/update-incident.dto';
import { IWebsocketRepository } from '../webSockets/websocket.interface';
import { WebsocketRepository } from '../webSockets/websocket.repository';

@Injectable()
export class IncidentsService {
  constructor(
    @Inject('IIncidensRepostiory')
    private readonly incidensRepostiory: IIncidensRepostiory,
    @Inject(forwardRef(() => WebsocketRepository))
    private readonly websocketRepository: WebsocketRepository,
  ) {}

  async GetAllIncidents(): Promise<Incident[]> {
    const operation: Incident[] =
      await this.incidensRepostiory.GetAllIncidents();
    return operation;
  }

  async CreateIncident(incidente: Incident): Promise<UpdateIncident> {
    const operation: UpdateIncident | null =
      await this.incidensRepostiory.CreateIncident(incidente);

    if (operation == null) {
      throw new AppValidationException("Operation executed but wasn't changes");
    }
    return operation;
  }

  async GetIncidentById(Id: string, partition_key: Cases): Promise<any> {
    const operation: Incident | null =
      await this.incidensRepostiory.GetIncidentById(Id, partition_key);

    if (operation == null) {
      throw new AppValidationException(`Incident with ID ${Id} not found.`);
    }
    return operation;
  }

  async UpdateIncident(
    updateIncident: UpdateIncident,
  ): Promise<UpdateIncident> {
    const operation: UpdateIncident =
      await this.incidensRepostiory.UpdateIncident(updateIncident);

    return operation;
  }
  async DeleteIncidentByID(
    Id: string,
    partition_key: Cases,
  ): Promise<Incident> {
    const operation: Incident =
      await this.incidensRepostiory.DeleteIncidentByID(Id, partition_key);

    return operation;
  }

  async GetIncidentsFromList(ids: string[]) {
    return await this.incidensRepostiory.GetIncidentsFromList(ids);
  }
}
