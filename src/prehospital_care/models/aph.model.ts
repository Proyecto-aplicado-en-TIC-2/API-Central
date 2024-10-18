import { Exclude } from 'class-transformer';
import { IAPH } from '../interfaces/aph.interface';
import { CreateAphDto } from '../dto/create-aph.dto';
import { UpdateAphDto } from '../dto/update-aph.dto';

const partitionKey = 'prehospital_care_accounts';

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

  static GetPartitionKey() {
    return partitionKey;
  }

  public equals(other: APH): boolean {
    return (
      this.id === other.id &&
      this.names === other.names &&
      this.last_names === other.last_names &&
      this.mail === other.mail &&
      this.phone_number === other.phone_number &&
      this.relationship_with_the_university ===
        other.relationship_with_the_university &&
      this.in_service === other.in_service &&
      this.quadrant === other.quadrant
    );
  }

  DtoCreate(id: string, Dto: CreateAphDto) {
    const aph = new APH();
    aph.id = id;
    aph.names = Dto.names;
    aph.last_names = Dto.last_names;
    aph.mail = Dto.mail;
    aph.phone_number = Dto.phone_number;
    aph.relationship_with_the_university = Dto.relationship_with_the_university;
    aph.in_service = Dto.in_service;
    aph.quadrant = Dto.quadrant;
    return aph;
  }

  DtoUpdate(id: string, mail: string, Dto: UpdateAphDto) {
    const aph = new APH();
    aph.id = id;
    aph.names = Dto.names;
    aph.last_names = Dto.last_names;
    aph.mail = mail;
    aph.phone_number = Dto.phone_number;
    aph.relationship_with_the_university = Dto.relationship_with_the_university;
    aph.in_service = Dto.in_service;
    aph.quadrant = Dto.quadrant;
    return aph;
  }
}
