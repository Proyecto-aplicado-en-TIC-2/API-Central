import { RelationshipWithTheUniversity } from 'src/incidents/dto/create-incident.dto';
import { IAPH } from '../interfaces/aph.interface';
import { UserDetails } from 'src/auth/dto/user-details.dto';

export class CreateAphDto implements IAPH {
  readonly names: string;
  readonly last_names: string;
  readonly mail: string;
  readonly phone_number: string;
  readonly relationshipWithTheUniversity: RelationshipWithTheUniversity;
  readonly in_service: boolean;
  readonly quadrant: string;
  public userDetails : UserDetails;
}
