import { Exclude } from 'class-transformer';
import { IAPH } from '../interfaces/aph.interface';
import { CreateAphDto } from '../dto/create-aph.dto';

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
}
