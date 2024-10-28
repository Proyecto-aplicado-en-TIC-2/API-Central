import { IBrigadier } from '../interfaces/brigadiers.interface';
import { Exclude } from 'class-transformer';
import { CreateBrigadierDto } from '../dto/create-brigadiers.dto';
import { UpdateBrigadiersDto } from '../dto/update-brigadiers.dto';
import { RelationshipWithTheUniversity } from 'src/incidents/dto/create-incident.dto';

const partitionKey = 'brigade_accounts';

export class Brigadier implements IBrigadier {
  id: string;
  partition_key: string = partitionKey;
  names: string;
  last_names: string;
  mail: string;
  phone_number: string;
  relationshipWithTheUniversity: RelationshipWithTheUniversity;
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
    brigadier.relationshipWithTheUniversity =
      Dto.relationshipWithTheUniversity;
    brigadier.in_service = Dto.in_service;
    brigadier.quadrant = Dto.quadrant;
    return brigadier;
  }

  DtoUpdate(id: string, mail: string, Dto: UpdateBrigadiersDto) {
    const brigadier = new Brigadier();
    brigadier.id = id;
    brigadier.names = Dto.names;
    brigadier.last_names = Dto.last_names;
    brigadier.mail = mail;
    brigadier.phone_number = Dto.phone_number;
    brigadier.relationshipWithTheUniversity =
      Dto.relationshipWithTheUniversity;
    brigadier.in_service = Dto.in_service;
    brigadier.quadrant = Dto.quadrant;
    return brigadier;
  }

  equals(other: Brigadier): boolean {
    if (!other) return false;

    return (
      this.id === other.id &&
      this.names === other.names &&
      this.last_names === other.last_names &&
      this.mail === other.mail &&
      this.phone_number === other.phone_number &&
      this.relationshipWithTheUniversity ===
        other.relationshipWithTheUniversity &&
      this.in_service === other.in_service &&
      this.quadrant === other.quadrant
    );
  }
}
