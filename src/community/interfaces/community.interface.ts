import { UserDetails } from 'src/auth/dto/user-details.dto';
import { RelationshipWithTheUniversity } from 'src/incidents/dto/create-incident.dto';

export interface ICommunity {
  readonly names: string;
  readonly last_names: string;
  readonly phone_number: string;
  readonly relationshipWithTheUniversity: RelationshipWithTheUniversity;
  userDetails : UserDetails;
}
