import { Exclude } from 'class-transformer';

const partitionKey = 'auth_accounts';

export class Auth {
  id: string;
  partition_key: string = partitionKey;
  mail: string;
  password: string;
  type_partition_key: string;

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
}
