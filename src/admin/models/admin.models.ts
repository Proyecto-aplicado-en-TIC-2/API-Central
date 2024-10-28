import { Exclude } from 'class-transformer';
import { CreateAdminDto } from '../dto/create-admin.dto';
import { UpdateAdminDto } from '../dto/update-admin.dto';

const partitionKey = 'admin_account';

export class Admin {
  id: string;
  partition_key: string = partitionKey;
  names: string;
  last_names: string;
  mail: string;

  @Exclude() // Esconder propiedad
  _rid: string;

  @Exclude() // Esconder propiedad
  _self: string;

  @Exclude() // Esconder propiedad
  _etag: string;

  @Exclude() // Esconder propiedad
  _attachments: string;

  @Exclude() // Esconder propiedad
  _ts: string;

  static GetPartitionKey() {
    return partitionKey;
  }

  DtoCreate(id: string, dto: CreateAdminDto) {
    const admin = new Admin();
    admin.id = id;
    admin.partition_key = partitionKey;
    admin.names = dto.names;
    admin.last_names = dto.last_names;
    admin.mail = dto.mail;
    return admin;
  }

  DtoUpdate(id: string, mail: string, dto: UpdateAdminDto) {
    const admin = new Admin();
    admin.id = id;
    admin.partition_key = partitionKey;
    admin.names = dto.names;
    admin.last_names = dto.last_names;
    admin.mail = mail;
    return admin;
  }

  equals(admin: Admin) {
    return (
      this.id === admin.id &&
      this.partition_key === partitionKey &&
      this.names === admin.names &&
      this.last_names === admin.last_names &&
      this.mail === admin.mail
    );
  }
}
