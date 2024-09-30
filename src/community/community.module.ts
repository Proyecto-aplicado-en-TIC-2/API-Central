import { Module } from '@nestjs/common';
import { CommunityService } from './community.service';
import { CommunityController } from './community.controller';
import { KeyVaultService } from '../context_db/DbContext.service';
import { CommunityRepository } from './repositories/community.repository';

@Module({
  controllers: [CommunityController],
  providers: [CommunityService, KeyVaultService, CommunityRepository],
})
export class CommunityModule {}
