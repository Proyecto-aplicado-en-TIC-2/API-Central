import { KeyVaultService } from 'src/context_db/DbContext.service';
import { Cases, Incident } from './dto/create-incident.dto';
import { IIncidensRepostiory } from './incidets.interface';
import { DbOperationException } from 'src/helpers/DbOperationException';
import { plainToInstance } from 'class-transformer';
import { UpdateIncident } from './dto/update-incident.dto';
import { Inject, Injectable } from '@nestjs/common';

const databaseId: string = 'risk_management';
const containerId: string = 'community_upb_reports';

@Injectable()
export class IncidentesRepository implements IIncidensRepostiory {
  //DB conenection -------------------------------------------------------
  constructor(@Inject(KeyVaultService) private DbConnection: KeyVaultService) {}

  //DB Methods -------------------------------------------------------
  async GetAllIncidents(): Promise<Incident[]> {
    try {
      const query = {
        query: 'SELECT * FROM c',
      };
      const { resources: results } = await this.DbConnection.getDbConnection()
        .database(databaseId)
        .container(containerId)
        .items.query(query)
        .fetchAll();

      const incidentInstances: Incident[] = plainToInstance(Incident, results);
      return incidentInstances;
    } catch (error) {
      throw new DbOperationException(error.message);
    }
  }

  async GetIncidentById(
    Id: string,
    partition_key: Cases,
  ): Promise<Incident | null> {
    try {
      const { resource: item } = await this.DbConnection.getDbConnection()
        .database(databaseId)
        .container(containerId)
        .item(Id, partition_key)
        .read();

      if (item) {
        return plainToInstance(Incident, item);
      }
      return null;
    } catch (error) {
      throw new DbOperationException(error.message);
    }
  }

  async CreateIncident(incident: Incident): Promise<UpdateIncident | null> {
    try {
      const { resource: CreateIncident } = 
        await this.DbConnection.getDbConnection()
          .database(databaseId)
          .container(containerId)
          .items.upsert(incident);

      if (CreateIncident) {
        return plainToInstance(UpdateIncident, CreateIncident);
      }
      return null;
    } catch (error) {
      throw new DbOperationException(error.message);
    }
  }

  async UpdateIncident(
    updateIncident: UpdateIncident,
  ): Promise<UpdateIncident> {
    try {
      const { resource: item } = await this.DbConnection.getDbConnection()
        .database(databaseId)
        .container(containerId)
        .item(updateIncident.id, updateIncident.partition_key)
        .replace(updateIncident);

      return plainToInstance(UpdateIncident, item);
    } catch (error) {
      throw new DbOperationException(error.message);
    }
  }

  async DeleteIncidentByID(
    Id: string,
    partition_key: Cases,
  ): Promise<Incident> {
    try {
      const { resource: item } = await this.DbConnection.getDbConnection()
        .database(databaseId)
        .container(containerId)
        .item(Id, containerId)
        .delete();

      return plainToInstance(Incident, item); //retiorna el item eliminado
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new DbOperationException(
        `Couldn't delete, Incident with the Id: ${Id} doesn't exist`,
      );
    }
  }

  async GetIncidentsFromList(ids: string[]): Promise<Incident[]> {
    try {
      const query = {
        query: 'SELECT * FROM c WHERE ARRAY_CONTAINS(@ids, c.id)',
        parameters: [
          {
            name: '@ids',
            value: ids,
          },
        ],
      };
      const { resources: results } = await this.DbConnection.getDbConnection()
        .database(databaseId)
        .container(containerId)
        .items.query(query)
        .fetchAll();

      return plainToInstance(Incident, results);
    } catch (error) {
      throw new DbOperationException('Joham Morales ->' + error.message);
    }
  }
}
