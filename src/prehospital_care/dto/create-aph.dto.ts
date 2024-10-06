import { IAPH } from '../interfaces/aph.interface';

export class CreateAphDto implements IAPH {
  readonly names: string;
  readonly last_names: string;
  readonly mail: string;
  readonly phone_number: string;
  readonly relationship_with_the_university: string;
  readonly in_service: boolean;
  readonly quadrant: string;
}
