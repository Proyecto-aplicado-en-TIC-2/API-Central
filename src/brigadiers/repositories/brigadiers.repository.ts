import { BadGatewayException, Inject, Injectable } from '@nestjs/common';
import { IBrigadiersRepository } from '../interfaces/brigadiers.repository.interface';
import { Brigadier } from '../models/brigadiers.model';
import { plainToClass } from 'class-transformer';
import { KeyVaultService } from '../../context_db/DbContext.service';

@Injectable()
export class BrigadiersRepository implements IBrigadiersRepository {
  private databaseId = 'risk_management';
  private containerId = 'brigadiers';

  constructor(
    @Inject(KeyVaultService) private readonly client: KeyVaultService,
  ) {}

  async GetAllBrigadiers(): Promise<Brigadier[]> {
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

      return items.map((item: Brigadier) => plainToClass(Brigadier, item));
    } catch (e) {
      throw new BadGatewayException('Error en GetAllCommunity ' + e);
    }
  }

  async GetBrigadierById(id: string) {
    try {
      // Consulta
      const { resource: item } = await this.client
        .getDbConnection()
        .database(this.databaseId)
        .container(this.containerId)
        .item(id, Brigadier.GetPartitionKey())
        .read();

      return plainToClass(Brigadier, item);
    } catch (e) {
      throw new BadGatewayException('Error en GetBrigadiersById ' + e);
    }
  }

  async GetBrigadierByEmail(mail: string) {
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

      return plainToClass(Brigadier, item[0]);
    } catch (e) {
      throw new BadGatewayException('Error en GetCommunityById ' + e);
    }
  }

  async CreateBrigade(brigadier: Brigadier) {
    try {
      const { resource: item } = await this.client
        .getDbConnection()
        .database(this.databaseId)
        .container(this.containerId)
        .items.upsert(brigadier);

      return plainToClass(Brigadier, item);
    } catch (e) {
      throw new BadGatewayException('Error en CreateUserCommunity ' + e);
    }
  }

  async UpdateBrigadiersById(brigadier: Brigadier) {
    try {
      const { resource: resource } = await this.client
        .getDbConnection()
        .database(this.databaseId)
        .container(this.containerId)
        .item(brigadier.id, brigadier.partition_key)
        .replace(brigadier);

      return resource.id;
    } catch (e) {
      throw new BadGatewayException('Error en UpdateCommunityUserById ' + e);
    }
  }
}
