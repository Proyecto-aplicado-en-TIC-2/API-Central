import { Exclude } from 'class-transformer';
import { IAPH } from '../interfaces/aph.interface';

const partitionKey = 'brigade_accounts';

export class APH implements IAPH {
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
}
