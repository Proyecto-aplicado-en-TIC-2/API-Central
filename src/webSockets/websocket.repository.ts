import { Inject, Injectable } from "@nestjs/common";
import { KeyVaultService } from "src/context_db/DbContext.service";
import { IWebsocketRepository } from "./websocket.interface";
import { ReportDto } from "./websocket.dto";
import { plainToInstance } from "class-transformer";
import { DbOperationException } from "src/helpers/DbOperationException";

const databaseId: string = 'risk_management';
const containerId: string = 'cases';

@Injectable()
export class WebsocketRepository implements IWebsocketRepository {
  //DB conenection -------------------------------------------------------
  constructor(@Inject(KeyVaultService) private DbConnection: KeyVaultService) {}
  async CreateReport(report: ReportDto): Promise<ReportDto | null> {
    try {
      const { resource: CreateReportDto } =
        await this.DbConnection.getDbConnection()
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