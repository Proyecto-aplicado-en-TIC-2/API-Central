import { RelationshipWithTheUniversity } from 'src/incidents/dto/create-incident.dto';
import { IBrigadier } from '../interfaces/brigadiers.interface';
import { UserDetails } from 'src/auth/dto/user-details.dto';

export class CreateBrigadierDto implements IBrigadier {
  readonly names: string;
  readonly last_names: string;
  readonly mail: string;
  readonly phone_number: string;
  readonly relationshipWithTheUniversity: RelationshipWithTheUniversity;
  readonly in_service: boolean;
  readonly quadrant: string;
  public userDetails : UserDetails;
}
