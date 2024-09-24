import { Controller, Get } from '@nestjs/common';
import { CommunityService } from './community.service';

// todo falta el Guards
@Controller('community')
export class CommunityController {
  constructor(private readonly communityService: CommunityService) {}

  // todo falta la Authentication
  // todo falta el Middleware
  // todo falta documentar en swagger
  @Get()
  async GetAllCommunity() {
    return this.communityService.GetAllCommunity();
  }
}
