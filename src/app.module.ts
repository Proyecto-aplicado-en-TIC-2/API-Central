import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KeyVaultService } from './context_db/DbContext.service';
import { CommunityModule } from './community/community.module';
import { IncidentsModule } from './incidents/incidents.module';
import { EmergencyReportsModule } from './emergency-reports/emergency-reports.module';
import { BrigadiersModule } from './brigadiers/brigadiers.module';
import { PrehospitalCareModule } from './prehospital_care/prehospital_care.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { AuthorizationGuard } from './authorization/authorization.guard';

@Module({
  imports: [
    CommunityModule,
    BrigadiersModule,
    PrehospitalCareModule,
    AuthModule,
    IncidentsModule,
    EmergencyReportsModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    KeyVaultService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: AuthorizationGuard,
    },
  ],
})
export class AppModule {}
