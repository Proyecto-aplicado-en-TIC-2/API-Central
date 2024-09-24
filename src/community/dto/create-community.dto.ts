import { ICommunity } from '../interfaces/community.interface';
import { Exclude } from 'class-transformer';

export class CreateCommunityDto implements ICommunity {
  id: string;
  CommunityID: string;
  names: string;
  lastNames: string;
  email: string;
  phoneNumber: string;
  relationshipWithTheUniversity: string;
}
