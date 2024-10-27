import { Injectable, Inject, BadGatewayException } from '@nestjs/common';
import { KeyVaultService } from 'src/context_db/DbContext.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { IAdminRepository } from './admin.interface';
import { plainToClass, plainToInstance } from 'class-transformer';
import { DbOperationException } from 'src/helpers/DbOperationException';
import { Brigadier } from '../brigadiers/models/brigadiers.model';
import { Admin } from './models/admin.models';

const databaseId = 'risk_management';
const containerId = 'admin';
const partitionKey = 'admin_account';

@Injectable()
export class AdminRepository implements IAdminRepository {
  constructor(@Inject(KeyVaultService) private dbConnection: KeyVaultService) {}

  async CreateAdmin(admin: Admin): Promise<Admin | null> {
    try {
      const { resource: createdAdmin } = await this.dbConnection
        .getDbConnection()
        .database(databaseId)
        .container(containerId)
        .items.upsert(admin);

      return plainToInstance(Admin, createdAdmin);
    } catch (error) {
      throw new DbOperationException(error.message);
    }
  }

  async GetAllAdmins(): Promise<Admin[]> {
    try {
      const query = { query: 'SELECT * FROM c' };
      const { resources: results } = await this.dbConnection
        .getDbConnection()
        .database(databaseId)
        .container(containerId)
        .items.query(query)
        .fetchAll();

      return results.map((item: Admin) => plainToClass(Admin, item));
    } catch (error) {
      throw new DbOperationException(error.message);
    }
  }

  async GetAdminById(id: string): Promise<Admin | null> {
    try {
      const { resource: admin } = await this.dbConnection
        .getDbConnection()
        .database(databaseId)
        .container(containerId)
        .item(id, Admin.GetPartitionKey())
        .read();

      return admin ? plainToInstance(Admin, admin) : null;
    } catch (error) {
      throw new DbOperationException(error.message);
    }
  }

  async GetAdminByMail(mail: string) {
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
      const { resources: item } = await this.dbConnection
        .getDbConnection()
        .database(databaseId)
        .container(containerId)
        .items.query(querySpec)
        .fetchAll();

      return plainToClass(Admin, item[0]);
    } catch (e) {
      throw new BadGatewayException('Error en GetCommunityById ' + e);
    }
  }

  async updateAdmin(admin: Admin) {
    try {
      const { resource: updatedAdmin } = await this.dbConnection
        .getDbConnection()
        .database(databaseId)
        .container(containerId)
        .item(admin.id, partitionKey)
        .replace(admin);

      return updatedAdmin.id;
    } catch (error) {
      throw new DbOperationException(error.message);
    }
  }

  async DeleteAdminById(admin: Admin) {
    try {
      const { resource: deletedAdmin } = await this.dbConnection
        .getDbConnection()
        .database(databaseId)
        .container(containerId)
        .item(admin.id, admin.partition_key)
        .delete();
    } catch (error) {
      throw new DbOperationException(error.message);
    }
  }
}
