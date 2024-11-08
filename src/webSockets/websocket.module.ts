import {
  forwardRef,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { WebsocketGateway } from './websocket.gateway';
import { APP_GUARD, Reflector } from '@nestjs/core'; // Importar Reflector
import { AuthGuard } from 'src/auth/auth.guard';
import { IncidentsModule } from 'src/incidents/incidents.module'; // Importa el módulo adecuado
import { WebsocketService } from './websocket.service';
import { KeyVaultService } from 'src/context_db/DbContext.service';
import { WebsocketRepository } from './websocket.repository';
import { PrehospitalCareModule } from 'src/prehospital_care/prehospital_care.module';
import { BrigadiersModule } from 'src/brigadiers/brigadiers.module';
import { EmergencyReportsModule } from 'src/emergency-reports/emergency-reports.module';
import { CommunityModule } from 'src/community/community.module';
import { WebsocketController } from './websockets.controller';

@Module({
  controllers: [WebsocketController],
  imports: [
    forwardRef(() => IncidentsModule),
    PrehospitalCareModule,
    BrigadiersModule,
    EmergencyReportsModule,
    CommunityModule
  ], // Importa el módulo que contiene el controlador
  providers: [
    WebsocketService,
    WebsocketGateway,
    Reflector,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    KeyVaultService,
    {
      provide: 'IWebsocketRepository', // Usamos un token para la interfaz
      useClass: WebsocketRepository, // Usamos la clase concreta
    },
  ],
  exports: [WebsocketService],
})
export class GatewayModule {}
