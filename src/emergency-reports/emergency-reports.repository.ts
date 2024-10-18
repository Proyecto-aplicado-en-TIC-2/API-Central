import { KeyVaultService } from 'src/context_db/DbContext.service';
import { DbOperationException } from 'src/helpers/DbOperationException';
import { plainToInstance } from 'class-transformer';
import { IEmergencyReportsRepostiory } from './emergency-reports.interface';
import { EmergencyReports } from './dto/create-emergency-reports.dto';
import { UpdateEmergencyReports } from './dto/update-emergency-reports.dto';
import { Inject, Injectable } from '@nestjs/common';

const databaseId: string = 'risk_management';
const containerId: string = 'complete_reports';

@Injectable()
export class EmergencyReportsRepository implements IEmergencyReportsRepostiory {
  //DB conenection -------------------------------------------------------
  constructor(@Inject(KeyVaultService) private DbConnection: KeyVaultService) {}

  //DB Methods -------------------------------------------------------
  async GetAllEmergencyReports(): Promise<EmergencyReports[]> {
    try {
      const query = {
        query: 'SELECT * FROM c',
      };
      const { resources: results } = await this.DbConnection.getDbConnection()
        .database(databaseId)
        .container(containerId)
        .items.query(query)
        .fetchAll();

      return plainToInstance(EmergencyReports, results);
    } catch (error) {
      throw new DbOperationException(error.message);
    }
  }

  async GetEmergencyReportsById(Id: string): Promise<EmergencyReports | null> {
    try {
      const { resource: item } = await this.DbConnection.getDbConnection()
        .database(databaseId)
        .container(containerId)
        .item(Id, containerId)
        .read();

      if (item) {
        return plainToInstance(EmergencyReports, item);
      }
      return null;
    } catch (error) {
      throw new DbOperationException(error.message);
    }
  }

  async CreateEmergencyReport(
    emergencyReports: EmergencyReports,
  ): Promise<EmergencyReports | null> {
    try {
      const { resource: CreateEmergencyReports } =
        await this.DbConnection.getDbConnection()
          .database(databaseId)
          .container(containerId)
          .items.upsert(emergencyReports);

      if (CreateEmergencyReports) {
        return plainToInstance(EmergencyReports, CreateEmergencyReports);
      }
      return null;
    } catch (error) {
      throw new DbOperationException(error.message);
    }
  }

  async UpdateEmergencyReport(
    updateEmergencyReports: UpdateEmergencyReports,
  ): Promise<UpdateEmergencyReports> {
    try {
      const { resource: item } = await this.DbConnection.getDbConnection()
        .database(databaseId)
        .container(containerId)
        .item(updateEmergencyReports.id, containerId)
        .replace(updateEmergencyReports);

      return plainToInstance(UpdateEmergencyReports, item);
    } catch (error) {
      throw new DbOperationException(error.message);
    }
  }

  async DeleteEmergencyReportByID(Id: string): Promise<EmergencyReports> {
    try {
      const { resource: item } = await this.DbConnection.getDbConnection()
        .database(databaseId)
        .container(containerId)
        .item(Id, containerId)
        .delete();

      return plainToInstance(EmergencyReports, item); //retiorna el item eliminado
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new DbOperationException(
        `Couldn't delete, the EmergencyAlert with the Id: ${Id} doesn't exist`,
      );
    }
  }
}
