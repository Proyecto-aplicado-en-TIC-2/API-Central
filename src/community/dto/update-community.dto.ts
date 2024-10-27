import { RelationshipWithTheUniversity } from 'src/incidents/dto/create-incident.dto';
import { ICommunity } from '../interfaces/community.interface';

export class UpdateCommunityUserDto implements ICommunity {
  names: string;
  last_names: string;
  phone_number: string;
  relationshipWithTheUniversity: RelationshipWithTheUniversity;
}
