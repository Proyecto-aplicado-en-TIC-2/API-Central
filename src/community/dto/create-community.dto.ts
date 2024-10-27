import { RelationshipWithTheUniversity } from 'src/incidents/dto/create-incident.dto';
import { ICommunity } from '../interfaces/community.interface';

export class CreateCommunityUserDto implements ICommunity {
  names: string;
  last_names: string;
  mail: string;
  phone_number: string;
  relationshipWithTheUniversity: RelationshipWithTheUniversity;
}
