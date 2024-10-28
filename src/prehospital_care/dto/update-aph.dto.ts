import { RelationshipWithTheUniversity } from 'src/incidents/dto/create-incident.dto';
import { IAPH } from '../interfaces/aph.interface';

export class UpdateAphDto implements IAPH {
  readonly names: string;
  readonly last_names: string;
  readonly phone_number: string;
  readonly relationshipWithTheUniversity: RelationshipWithTheUniversity;
  readonly in_service: boolean;
  readonly quadrant: string;
}
