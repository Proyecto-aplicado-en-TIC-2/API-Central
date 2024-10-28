import { RelationshipWithTheUniversity } from 'src/incidents/dto/create-incident.dto';
import { IBrigadier } from '../interfaces/brigadiers.interface';

export class UpdateBrigadiersDto implements IBrigadier {
  readonly names: string;
  readonly last_names: string;
  readonly phone_number: string;
  readonly relationshipWithTheUniversity: RelationshipWithTheUniversity;
  readonly in_service: boolean;
  readonly quadrant: string;
}
