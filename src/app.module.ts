import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KeyVaultService } from './context_db/DbContext.service';
import { CommunityModule } from './community/community.module';
import { BrigadiersModule } from './brigadiers/brigadiers.module';

@Module({
  imports: [CommunityModule, BrigadiersModule],
  controllers: [AppController],
  providers: [AppService, KeyVaultService],
})
export class AppModule {}
