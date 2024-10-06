import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KeyVaultService } from './context_db/DbContext.service';
import { CommunityModule } from './community/community.module';
import { BrigadiersModule } from './brigadiers/brigadiers.module';
import { PrehospitalCareModule } from './prehospital_care/prehospital_care.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    CommunityModule,
    BrigadiersModule,
    PrehospitalCareModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, KeyVaultService],
})
export class AppModule {}
