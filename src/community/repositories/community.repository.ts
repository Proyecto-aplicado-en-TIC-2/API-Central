import { BadGatewayException, Inject, Injectable } from '@nestjs/common';
import { KeyVaultService } from '../../context_db/DbContext.service';
import { Community } from '../dto/community.dto';
import { CreateCommunityDto } from '../dto/create-community.dto';

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

  /**
   * Obtiene un item por ID del contendor **Community**
   * */
  async GetCommunityById(Id: string, CommunityKey: string): Promise<Community> {
    try {
      // Parámetros de consulta
      const { resource: item } = await this.client
        .getDbConnection()
        .database(databaseID)
        .container(containerID)
        .item(Id, CommunityKey)
        .read();

      // Devolvemos resultado
      return item;
    } catch (e) {
      throw new BadGatewayException('Error en GetCommunityById ' + e);
    }
  }

  /**
   * Obtiene un item por email del contendor **Community**
   * */
  async GetCommunityByEmail(Email: string): Promise<Community> {
    try {
      // Query para cosmos DB
      const querySpec = {
        query: 'SELECT * FROM c WHERE c.email = @Email',
        parameters: [
          {
            name: '@Email',
            value: Email,
          },
        ],
      };

      // Parámetros de consulta
      const { resources: results } = await this.client
        .getDbConnection()
        .database(databaseID)
        .container(containerID)
        .items.query(querySpec)
        .fetchAll();

      // Devolvemos resultado
      return results[0];
    } catch (e) {
      throw new BadGatewayException('Error en GetCommunityById ' + e);
    }
  }

  async CreateUserCommunity(
    newUserCommunity: CreateCommunityDto,
  ): Promise<boolean | string> {
    try {
      const { resource: resource, statusCode: statusCode } = await this.client
        .getDbConnection()
        .database(databaseID)
        .container(containerID)
        .items.upsert(newUserCommunity);
      if (statusCode == 200) {
        return false;
      } else {
        return resource.id;
      }
    } catch (e) {
      throw new BadGatewayException('Error en CreateUserCommunity ' + e);
    }
  }

  async UpdateCommunityUserById(
    updateCommunityDto: Community,
  ): Promise<Community> {
    try {
      const { resource: resource } = await this.client
        .getDbConnection()
        .database(databaseID)
        .container(containerID)
        .item(updateCommunityDto.id, updateCommunityDto.CommunityID)
        .replace(updateCommunityDto);
      return resource;
    } catch (e) {
      throw new BadGatewayException('Error en UpdateCommunityUserById ' + e);
    }
  }

  async DeleteCommunityUserById(userCommunity: Community) {
    try {
      await this.client
        .getDbConnection()
        .database(databaseID)
        .container(containerID)
        .item(userCommunity.id, userCommunity.CommunityID)
        .delete(userCommunity);

      return userCommunity.id;
    } catch (e) {
      throw new BadGatewayException('Error en CreateUserCommunity ' + e);
    }
  }
}
