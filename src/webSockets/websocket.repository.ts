import { Inject, Injectable } from '@nestjs/common';
import { KeyVaultService } from 'src/context_db/DbContext.service';
import { IWebsocketRepository } from './websocket.interface';
import { Cases, ReportDto, UserWebsocketInfo } from './websocket.dto';
import { plainToClass, plainToInstance } from 'class-transformer';
import { DbOperationException } from 'src/helpers/DbOperationException';
import { UpdateIncident } from 'src/incidents/dto/update-incident.dto';
import { Role } from 'src/authorization/role.enum';
import { Community } from '../community/models/community.model';

const databaseId: string = 'risk_management';
const containerId: string = 'cases';
const containerId_websockets: string = 'websockets_active';

@Injectable()
export class WebsocketRepository implements IWebsocketRepository {
  client: any;
  //DB conenection -------------------------------------------------------
  constructor(@Inject(KeyVaultService) private DbConnection: KeyVaultService) {}

  async CreatetWebsocketInfo(userWebsocketIfo: UserWebsocketInfo): Promise<UserWebsocketInfo> {
    try {
      const { resource: item } =
        await this.DbConnection
          .getDbConnection()
          .database(databaseId)
          .container(containerId_websockets)
          .items.upsert(userWebsocketIfo);

      if (item) {
        return plainToInstance(UserWebsocketInfo, item);
      }
      return null;
    } catch (error) {
      throw new DbOperationException(error.message);
    }
  }
  async GetWebsocketInfoAdmin(): Promise<UserWebsocketInfo> {
    try {
      // Query
      const querySpec = {
        query:
          'SELECT * FROM c WHERE c.partition_key = "admin_account"',
       
      };
      // Consulta
      const { resources: item } = await this.DbConnection.getDbConnection()
        .database(databaseId)
        .container(containerId_websockets)
        .items.query(querySpec)
        .fetchAll();

      const websocketInfoAdmin: UserWebsocketInfo = plainToInstance(UserWebsocketInfo, item[0]);
      return websocketInfoAdmin;
    } catch (error) {
      throw new DbOperationException(error.message);
    }
  }
  async GetWebsocketInfo(id: string): Promise<UserWebsocketInfo> {
    try {
      const querySpec = {
        query:
           'SELECT * FROM c WHERE c.id = @id',
        parameters: [
          {
            name: '@id',
            value: id,
          },
        ],
      };
      const { resources: item } = await this.DbConnection
        .getDbConnection()
        .database(databaseId)
        .container(containerId_websockets)
        .items.query(querySpec)
        .fetchAll();

      if (item) {
        return plainToInstance(UserWebsocketInfo, item[0]);
      }
      return null;
    } catch (error) {
      throw new DbOperationException(error.message);
    }
  }
  async PatchWebsocketInfo(userWebsocketIfo: UserWebsocketInfo): Promise<UserWebsocketInfo> {
    try {
      const { resource: item } = await this.DbConnection.getDbConnection()
        .database(databaseId)
        .container(containerId_websockets)
        .item(userWebsocketIfo.id, userWebsocketIfo.partition_key)
        .replace(userWebsocketIfo);

      return plainToInstance(UserWebsocketInfo, item);
    } catch (error) {
      throw new DbOperationException(error.message);
    }
  }
  async DeleteWebsocketInfo(id: string,  partition_key: string): Promise<boolean> {
    try {
   
      // Consulta
      const { resource: item } = await this.DbConnection.getDbConnection()
        .database(databaseId)
        .container(containerId_websockets)
        .item(id, partition_key)
        .delete();

        return true;
   

    } catch (error) {
      throw new DbOperationException(
        `Couldn't delete, WebsocketInfo with the Id: ${id} doesn't exist`, 
      );
    }
  }

  async GetReportsIdsById(id: string): Promise<string[]> {
    try {
      const querySpec = {
        query:
          'SELECT * FROM c WHERE c.aphThatTakeCare_Id = @aphThatTakeCare_Id' +
          ' AND c.State = "en_proceso"',
        parameters: [
          {
            name: '@aphThatTakeCare_Id',
            value: id,
          },
        ],
      };
      const { resources: results } = await this.DbConnection.getDbConnection()
        .database(databaseId)
        .container(containerId)
        .items.query(querySpec)
        .fetchAll();

      const incidentInstances: UpdateIncident[] = plainToInstance(
        UpdateIncident,
        results,
      );
      // Mapea los incidentes para obtener solo los ids y los devuelve
      const incidentIds: string[] = incidentInstances.map(
        (incident) => incident.id,
      );
      console.log(incidentIds);
      return incidentIds;
    } catch (error) {
      throw new DbOperationException(error.message);
    }
  }

  async GetReportsColsedIdsById(id: string): Promise<string[]> {
    try {
      const querySpec = {
        query:
          'SELECT * FROM c WHERE c.aphThatTakeCare_Id = @aphThatTakeCare_Id' +
          ' AND c.State = "close"',
        parameters: [
          {
            name: '@aphThatTakeCare_Id',
            value: id,
          },
        ],
      };
      const { resources: results } = await this.DbConnection.getDbConnection()
        .database(databaseId)
        .container(containerId)
        .items.query(querySpec)
        .fetchAll();

      const incidentInstances: UpdateIncident[] = plainToInstance(
        UpdateIncident,
        results,
      );
      // Mapea los incidentes para obtener solo los ids y los devuelve
      const incidentIds: string[] = incidentInstances.map(
        (incident) => incident.id,
      );
      console.log(incidentIds);
      return incidentIds;
    } catch (error) {
      throw new DbOperationException(error.message);
    }
  }

  async GetNewReports(): Promise<ReportDto[]> {
    try {
      const now = new Date();
      const date = now.toISOString().split('T')[0];
      // Query
      const querySpec = {
        query:
          'SELECT * FROM c WHERE c.State = "en_proceso" AND c.brigadista_Id = "" AND c.aphThatTakeCare_Id = "" AND c.date.date = @date',
        parameters: [
          {
            name: '@date',
            value: date,
          },
        ],
      };

      // Consulta
      const { resources: item } = await this.DbConnection.getDbConnection()
        .database(databaseId)
        .container(containerId)
        .items.query(querySpec)
        .fetchAll();

      const adminActiveDtow_obj: ReportDto[] = plainToInstance(ReportDto, item);
      return adminActiveDtow_obj;
    } catch (error) {
      throw new DbOperationException(error.message);
    }
  }

  async CreateReport(report: ReportDto): Promise<ReportDto | null> {
    try {
      const { resource: CreateReportDto } =
        await this.DbConnection.getDbConnection()
          .database(databaseId)
          .container(containerId)
          .items.upsert(report);

      console.log('upsert CreateReport good');
      console.log(CreateReportDto);
      if (CreateReportDto) {
        const item: ReportDto = plainToInstance(ReportDto, CreateReportDto);
        console.log(item);
        return item;
      }
      return null;
    } catch (error) {
      throw new DbOperationException(error.message);
    }
  }
  async GetReportById(
    id: string,
    partition_key_Cases: Cases,
  ): Promise<ReportDto> {
    try {
      const { resource: item } = await this.DbConnection.getDbConnection()
        .database(databaseId)
        .container(containerId)
        .item(id, partition_key_Cases)
        .read();

      if (item) {
        const report: ReportDto = plainToInstance(ReportDto, item);
        return report;
      }
      return null;
    } catch (error) {
      throw new DbOperationException(error.message);
    }
  }
  async PatchReport(reportDto: ReportDto): Promise<ReportDto> {
    try {
      const { resource: item } = await this.DbConnection.getDbConnection()
        .database(databaseId)
        .container(containerId)
        .item(reportDto.id, reportDto.partition_key)
        .replace(reportDto);

      console.log(item);
      return plainToInstance(ReportDto, item);
    } catch (error) {
      throw new DbOperationException(error.message);
    }
  }

  async GetOpenReports(): Promise<ReportDto[]> {
    try {
      const now = new Date();
      const date = now.toISOString().split('T')[0];
      // Query
      const querySpec = {
        query:
          'SELECT * FROM c WHERE c.State = "en_proceso" AND c.aphThatTakeCare_Id != ""',
      };

      // Consulta
      const { resources: item } = await this.DbConnection.getDbConnection()
        .database(databaseId)
        .container(containerId)
        .items.query(querySpec)
        .fetchAll();

      return plainToInstance(ReportDto, item);
    } catch (error) {
      throw new DbOperationException(error.message);
    }
  }

  async GetReportsNeedHelp(): Promise<ReportDto[]> {
    try {
      const now = new Date();
      const date = now.toISOString().split('T')[0];
      // Query
      const querySpec = {
        query:
          'SELECT * FROM c WHERE c.neededBrigadier = true AND c.brigadista_Id = "" AND c.date.date = @date',
        parameters: [
          {
            name: '@date',
            value: date,
          },
        ],
      };

      // Consulta
      const { resources: items } = await this.DbConnection.getDbConnection()
        .database(databaseId)
        .container(containerId)
        .items.query(querySpec)
        .fetchAll();

      return items.map((item: Community) => plainToClass(ReportDto, item));
    } catch (error) {
      throw new DbOperationException(error.message);
    }
  }
}
