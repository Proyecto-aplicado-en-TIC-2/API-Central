import { Community } from '../models/community.model';

export interface ICommunityRepositories {
  GetAllCommunityUsers(): Promise<Community[]>;
  GetCommunityUserById(id: string): Promise<Community>;
  GetCommunityUserByEmail(email: string): Promise<Community>;
  CreateCommunityUser(community: Community): Promise<Community>;
  UpdateCommunityUserById(community: Community): Promise<string>;
  DeleteCommunityUserById(community: Community): void;
}
