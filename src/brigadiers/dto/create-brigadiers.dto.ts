import { IBrigadier } from '../interfaces/brigadiers.interface';

export class CreateBrigadierDto implements IBrigadier {
  readonly names: string;
  readonly last_names: string;
  readonly mail: string;
  readonly phone_number: string;
  readonly relationship_with_the_university: string;
  readonly in_service: boolean;
  readonly quadrant: string;
}
