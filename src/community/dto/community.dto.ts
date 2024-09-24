import { ICommunity } from '../interfaces/community.interface';
import { Exclude } from 'class-transformer';

export class Community implements ICommunity {
  id: string;
  CommunityID: string;
  names: string;
  lastNames: string;
  email: string;
  phoneNumber: string;
  relationshipWithTheUniversity: string;

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
