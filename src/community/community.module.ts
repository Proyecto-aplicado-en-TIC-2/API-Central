import { Module } from '@nestjs/common';
import { CommunityService } from './community.service';
import { CommunityController } from './community.controller';
import { KeyVaultService } from '../context_db/DbContext.service';
import { CommunityRepository } from './repositories/community.repository';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '../auth/auth.guard';

@Module({
  controllers: [CommunityController],
  providers: [
    CommunityService,
    KeyVaultService,
    CommunityRepository,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class CommunityModule {}
