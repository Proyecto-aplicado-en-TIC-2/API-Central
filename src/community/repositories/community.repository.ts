import { BadGatewayException, Inject, Injectable } from '@nestjs/common';
import { KeyVaultService } from '../../Context/DbContext.service';

const databaseID = 'ToDoList';
const containerID = 'Community';

@Injectable()
export class CommunityRepository {
  constructor(@Inject(KeyVaultService) private client: KeyVaultService) {}

  /**
   * Obtiene todos los items de del contenedor **Community**
   * */
  async GetAllCommunity() {
    try {
      // Query para cosmos DB
      const querySpec = {
        query: 'SELECT * FROM c',
      };

      // Parámetros de consulta
      const { resources: results } = await this.client
        .getDbConnection()
        .database(databaseID)
        .container(containerID)
        .items.query(querySpec)
        .fetchAll();

      // Devolvemos resultado
      return results;
    } catch (e) {
      throw new BadGatewayException('Error en GetAllCommunity ' + e);
    }
  }
}
