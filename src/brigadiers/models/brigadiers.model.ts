import { IBrigadier } from '../interfaces/brigadiers.interface';
import { Exclude } from 'class-transformer';
import { CreateBrigadierDto } from '../dto/create-brigadiers.dto';

const partitionKey = 'brigade_accounts';

export class Brigadier implements IBrigadier {
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

  DtoCreate(id: string, Dto: CreateBrigadierDto) {
    const brigadier = new Brigadier();
    brigadier.id = id;
    brigadier.names = Dto.names;
    brigadier.last_names = Dto.last_names;
    brigadier.mail = Dto.mail;
    brigadier.phone_number = Dto.phone_number;
    brigadier.relationship_with_the_university =
      Dto.relationship_with_the_university;
    brigadier.in_service = Dto.in_service;
    brigadier.quadrant = Dto.quadrant;
    return brigadier;
  }
}
