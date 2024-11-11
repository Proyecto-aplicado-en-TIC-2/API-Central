import { BadGatewayException, Inject, Injectable } from '@nestjs/common';
import { KeyVaultService } from '../../context_db/DbContext.service';
import { plainToClass } from 'class-transformer';
import { Auth } from '../models/auth.models';
import { Brigadier } from '../../brigadiers/models/brigadiers.model';

@Injectable()
export class AuthRepository {
  private databaseId = 'risk_management';
  private containerId = 'auth';

  constructor(
    @Inject(KeyVaultService) private readonly client: KeyVaultService,
  ) {}

  async GetAccountEmail(mail: string): Promise<Auth> {
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

      return plainToClass(Auth, item[0]);
    } catch (e) {
      throw new BadGatewayException('Error en GetCommunityById ' + e);
    }
  }

  async CreateAccount(auth: Auth) {
    try {
      const { resource: item } = await this.client
        .getDbConnection()
        .database(this.databaseId)
        .container(this.containerId)
        .items.upsert(auth);

      return plainToClass(Brigadier, item);
    } catch (e) {
      throw new BadGatewayException('Error en CreateUserCommunity ' + e);
    }
  }

  async DeleteAuthByEmail(auth: Auth) {
    try {
      // Consulta
      await this.client
        .getDbConnection()
        .database(this.databaseId)
        .container(this.containerId)
        .item(auth.id, auth.partition_key)
        .delete();
    } catch (e) {
      throw new BadGatewayException('Error en CreateUserCommunity ' + e);
    }
  }
}
