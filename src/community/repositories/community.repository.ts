import { BadGatewayException, Inject, Injectable } from '@nestjs/common';
import { KeyVaultService } from '../../context_db/DbContext.service';
import { Community } from '../models/community.model';
import { ICommunityRepositories } from '../interfaces/community.repository.interface';
import { plainToClass } from 'class-transformer';

@Injectable()
export class CommunityRepository implements ICommunityRepositories {
  private databaseId = 'risk_management';
  private containerId = 'community_upb';

  constructor(@Inject(KeyVaultService) private client: KeyVaultService) {}

  /**
   * Obtiene todos los items de del contenedor **Community**
   * */
  async GetAllCommunityUsers(): Promise<Community[]> {
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

      return items.map((item: Community) => plainToClass(Community, item));
    } catch (e) {
      throw new BadGatewayException('Error en GetAllCommunity ' + e);
    }
  }

  /**
   * Obtiene un item por ID del contendor **Community**
   * */
  async GetCommunityUserById(id: string): Promise<Community> {
    try {
      // Consulta
      const { resource: item } = await this.client
        .getDbConnection()
        .database(this.databaseId)
        .container(this.containerId)
        .item(id, Community.partition_key)
        .read();

      return plainToClass(Community, item);
    } catch (e) {
      throw new BadGatewayException('Error en GetCommunityById ' + e);
    }
  }

  /**
   * Obtiene un item por email del contendor **Community**
   * */
  async GetCommunityUserByEmail(mail: string): Promise<Community> {
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

      return plainToClass(Community, item[0]);
    } catch (e) {
      throw new BadGatewayException('Error en GetCommunityById ' + e);
    }
  }

  async CreateCommunityUser(community: Community): Promise<Community> {
    try {
      const { resource: item } = await this.client
        .getDbConnection()
        .database(this.databaseId)
        .container(this.containerId)
        .items.upsert(community);

      return plainToClass(Community, item);
    } catch (e) {
      throw new BadGatewayException('Error en CreateUserCommunity ' + e);
    }
  }

  async UpdateCommunityUserById(community: Community): Promise<string> {
    try {
      const { resource: resource } = await this.client
        .getDbConnection()
        .database(this.databaseId)
        .container(this.containerId)
        .item(community.id, community.partition_key)
        .replace(community);

      return resource.id;
    } catch (e) {
      throw new BadGatewayException('Error en UpdateCommunityUserById ' + e);
    }
  }

  async DeleteCommunityUserById(community: Community) {
    try {
      // Consulta
      await this.client
        .getDbConnection()
        .database(this.databaseId)
        .container(this.containerId)
        .item(community.id, community.partition_key)
        .delete(community);
    } catch (e) {
      throw new BadGatewayException('Error en CreateUserCommunity ' + e);
    }
  } 
}
