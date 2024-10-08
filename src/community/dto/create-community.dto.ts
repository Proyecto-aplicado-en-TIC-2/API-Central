import { ICommunity } from '../interfaces/community.interface';

export class CreateCommunityUserDto implements ICommunity {
  names: string;
  last_names: string;
  mail: string;
  phone_number: string;
  relationship_with_the_university: string;
}
