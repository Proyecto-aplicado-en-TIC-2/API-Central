import { RelationshipWithTheUniversity } from 'src/incidents/dto/create-incident.dto';
import { ICommunity } from '../interfaces/community.interface';
import { UserDetails } from 'src/auth/dto/user-details.dto';

export class CreateCommunityUserDto implements ICommunity {
  names: string;
  last_names: string;
  mail: string;
  phone_number: string;
  relationshipWithTheUniversity: RelationshipWithTheUniversity;
  userDetails : UserDetails;
}
