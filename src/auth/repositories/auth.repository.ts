import { BadGatewayException, Inject, Injectable } from '@nestjs/common';
import { KeyVaultService } from '../../context_db/DbContext.service';
import { plainToClass } from 'class-transformer';
import { Auth } from '../models/auth.models';

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
}
