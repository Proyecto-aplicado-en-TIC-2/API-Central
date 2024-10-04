import { IBrigadeMember } from '../interfaces/brigadiers.interface';
import { Exclude } from 'class-transformer';

const partitionKey = 'brigade_accounts';

export class BrigadeMember implements IBrigadeMember {
  id: string;
  partition_key: string = partitionKey;
  names: string;
  last_names: string;
  mail: string;
  phone_number: string;
  relationship_with_the_university: string;
  in_service: boolean;
  quadrant: string;

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
}
