import { ICommunity } from '../interfaces/community.interface';

export class UpdateCommunityUserDto implements ICommunity {
  names: string;
  last_names: string;
  phone_number: string;
  relationship_with_the_university: string;
}
