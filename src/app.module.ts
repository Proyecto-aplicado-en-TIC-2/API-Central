import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestDB } from './Services/test.service';
import { KeyVaultService } from './Context/DbContext.service';
import { UsersModule } from './users/users.module';
import { CommunityModule } from './community/community.module';

@Module({
  imports: [UsersModule, CommunityModule],
  controllers: [AppController],
  providers: [AppService, TestDB, KeyVaultService],
})
export class AppModule {}
