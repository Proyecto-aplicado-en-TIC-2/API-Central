import { ICommunity } from '../interfaces/community.interface';
import { Exclude } from 'class-transformer';
import { CreateCommunityUserDto } from '../dto/create-community.dto';
import { UpdateCommunityUserDto } from '../dto/update-community.dto';
import { RelationshipWithTheUniversity } from 'src/incidents/dto/create-incident.dto';
import { UserDetails } from 'src/auth/dto/user-details.dto';

export class Community implements ICommunity {
  static partition_key: string = 'upb_community_accounts';

  id: string;
  partition_key: string = 'upb_community_accounts';
  names: string;
  last_names: string;
  mail: string;
  phone_number: string;
  relationshipWithTheUniversity: RelationshipWithTheUniversity;
  public userDetails : UserDetails;

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

  DtoCreate(id: string, Dto: CreateCommunityUserDto) {
    const community = new Community();
    community.id = id;
    community.names = Dto.names;
    community.last_names = Dto.last_names;
    community.mail = Dto.mail;
    community.phone_number = Dto.phone_number;
    community.relationshipWithTheUniversity = Dto.relationshipWithTheUniversity;
    community.userDetails = Dto.userDetails;
    return community;
  }

  DtoUpdate(id: string, mail: string, Dto: UpdateCommunityUserDto) {
    const community = new Community();
    community.id = id;
    community.names = Dto.names;
    community.last_names = Dto.last_names;
    community.mail = mail;
    community.phone_number = Dto.phone_number;
    community.relationshipWithTheUniversity = Dto.relationshipWithTheUniversity;
    community.userDetails = Dto.userDetails;
    return community;
  }

  equals(other: Community): boolean {
    if (!other) return false;

    return (
      this.id === other.id &&
      this.names === other.names &&
      this.last_names === other.last_names &&
      this.mail === other.mail &&
      this.phone_number === other.phone_number &&
      this.relationshipWithTheUniversity === other.relationshipWithTheUniversity &&
      this.userDetails === other.userDetails
    );
  }
}
