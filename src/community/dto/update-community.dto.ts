import { ICommunity } from '../interfaces/community.interface';

export class UpdateCommunityDto implements ICommunity {
  names: string;
  lastNames: string;
  phoneNumber: string;
  relationshipWithTheUniversity: string;
}
