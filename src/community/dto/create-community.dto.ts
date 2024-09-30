import { ICommunity } from '../interfaces/community.interface';

export class CreateCommunityDto implements ICommunity {
  names: string;
  lastNames: string;
  email: string;
  phoneNumber: string;
  relationshipWithTheUniversity: string;
}
