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

  DtoCreate(
    id: string,
    mail: string,
    password: string,
    type_partition_key: string,
  ) {
    const auth = new Auth();
    auth.id = id;
    auth.mail = mail;
    auth.password = password;
    auth.type_partition_key = type_partition_key;
    return auth;
  }
}

export class AuthDto {
  public id: string;
  public mail: string;
  public roles: string;
}
