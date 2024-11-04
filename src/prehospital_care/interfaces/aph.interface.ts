import { UserDetails } from "src/auth/dto/user-details.dto";
import { RelationshipWithTheUniversity } from "src/incidents/dto/create-incident.dto";

export interface IAPH {
  names: string;
  last_names: string;
  phone_number: string;
  relationshipWithTheUniversity: RelationshipWithTheUniversity;
  in_service: boolean;
  quadrant: string;
  userDetails : UserDetails;
}
