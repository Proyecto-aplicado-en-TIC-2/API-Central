import { Inject, Injectable } from "@nestjs/common";
import { KeyVaultService } from "src/context_db/DbContext.service";
import { IWebsocketRepository } from "./websocket.interface";
import { AdminActiveDto, ReportDto } from "./websocket.dto";
import { plainToClass, plainToInstance } from "class-transformer";
import { DbOperationException } from "src/helpers/DbOperationException";
import { IS_HEXADECIMAL } from "class-validator";

const databaseId: string = 'risk_management';
const containerId: string = 'cases';

@Injectable()
export class WebsocketRepository implements IWebsocketRepository {
  client: any;
  //DB conenection -------------------------------------------------------
  constructor(@Inject(KeyVaultService) private DbConnection: KeyVaultService) {}
  async GetAdminActiveByPartitionKey(): Promise<AdminActiveDto> {
    try {
      // Query
      const querySpec = {
        query: 'SELECT * FROM c WHERE c.partition_key = @partition_key',
        parameters: [
          {
            name: '@partition_key',
            value: 'admin_active',
          },
        ],
      };

      // Consulta
      const { resources: item } = await this.DbConnection
        .getDbConnection()
        .database(databaseId)
        .container(containerId)
        .items.query(querySpec)
        .fetchAll();

        const adminActiveDtow_obj: AdminActiveDto = plainToInstance(AdminActiveDto, item[0]);
        return adminActiveDtow_obj;

    } catch (error) {
      throw new DbOperationException(error.message);
    }
  }
  async PatchAdminActive(adminActiveDto: AdminActiveDto): Promise<AdminActiveDto> {
    try {
      const { resource: item } = await this.DbConnection.getDbConnection()
        .database(databaseId)
        .container(containerId)
        .item(adminActiveDto.id, 'admin_active')
        .replace(adminActiveDto);

      return plainToInstance(AdminActiveDto, item);
    } catch (error) {
      throw new DbOperationException(error.message);
    }
  }
  async GetAdminActive(adminActiveDto: AdminActiveDto): Promise<AdminActiveDto | null> {
    try {
      const { resource: item } = await this.DbConnection
        .getDbConnection()
        .database(databaseId)
        .container(containerId)
        .item(adminActiveDto.id, 'admin_active')
        .read();

        if (item) {
          return plainToInstance(AdminActiveDto, item);
        }
        return null;
      } catch (error) {
        throw new DbOperationException(error.message);
      }
  }
  
  async CreateAdminActive(adminActiveDto: AdminActiveDto): Promise<AdminActiveDto | null> {
    try {
      const { resource: CreateAdminActiveDto } =
        await this.DbConnection
          .getDbConnection()
          .database(databaseId)
          .container(containerId)
          .items.upsert(adminActiveDto);

      if (CreateAdminActiveDto) {
        return plainToInstance(AdminActiveDto, CreateAdminActiveDto);
      }
      return null;
    } catch (error) {
      throw new DbOperationException(error.message);
    }
  }
  async CreateReport(report: ReportDto): Promise<ReportDto | null> {
    try {
      const { resource: CreateReportDto } =
        await this.DbConnection
          .getDbConnection()
          .database(databaseId)
          .container(containerId)
          .items.upsert(report);

      if (CreateReportDto) {
        return plainToInstance(ReportDto, CreateReportDto);
      }
      return null;
    } catch (error) {
      throw new DbOperationException(error.message);
    }
  }
  async GetState(): Promise<String> {
    throw new Error("Method not implemented.");
  }
  async PatchReport(reportDto: ReportDto): Promise<ReportDto> {
    throw new Error("Method not implemented.");
  }
}