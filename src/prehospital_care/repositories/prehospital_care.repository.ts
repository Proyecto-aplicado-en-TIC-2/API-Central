import { BadGatewayException, Inject, Injectable } from '@nestjs/common';
import { IPrehospitalCareRepository } from '../interfaces/prehospital_care.repository.interface';
import { APH } from '../models/aph.model';
import { plainToClass } from 'class-transformer';
import { KeyVaultService } from '../../context_db/DbContext.service';

@Injectable()
export class PrehospitalCareRepository implements IPrehospitalCareRepository {
  private databaseId = 'risk_management';
  private containerId = 'prehospital_care';

  constructor(@Inject(KeyVaultService) private client: KeyVaultService) {}

  async GetAllAPHs(): Promise<APH[]> {
    try {
      // Query
      const querySpec = {
        query: 'SELECT * FROM c',
      };

      // Consulta
      const { resources: items } = await this.client
        .getDbConnection()
        .database(this.databaseId)
        .container(this.containerId)
        .items.query(querySpec)
        .fetchAll();

      return items.map((item: APH) => plainToClass(APH, item));
    } catch (e) {
      throw new BadGatewayException('Error en GetAllCommunity ' + e);
    }
  }

  async GetAPHById(id: string) {
    try {
      // Consulta
      const { resource: item } = await this.client
        .getDbConnection()
        .database(this.databaseId)
        .container(this.containerId)
        .item(id, APH.GetPartitionKey())
        .read();

      return plainToClass(APH, item);
    } catch (e) {
      throw new BadGatewayException('Error en GetCommunityById ' + e);
    }
  }

  async GetAPHByMail(mail: string) {
    try {
      // Query
      const querySpec = {
        query: 'SELECT * FROM c WHERE c.mail = @mail',
        parameters: [
          {
            name: '@mail',
            value: mail,
          },
        ],
      };

      // Consulta
      const { resources: item } = await this.client
        .getDbConnection()
        .database(this.databaseId)
        .container(this.containerId)
        .items.query(querySpec)
        .fetchAll();

      return plainToClass(APH, item[0]);
    } catch (e) {
      throw new BadGatewayException('Error en GetCommunityById ' + e);
    }
  }
}
