import { Inject, Injectable } from '@nestjs/common';
import { CommunityRepository } from './repositories/community.repository';

@Injectable()
export class CommunityService {

  constructor(@Inject(CommunityRepository) private readonly communityRepository: CommunityRepository) {
  }

  async GetAllUsers() {
    try {
      return this.communityRepository.GetAllCommunity();
    } catch (error) {
      console.log(error);
    }
  }
}
