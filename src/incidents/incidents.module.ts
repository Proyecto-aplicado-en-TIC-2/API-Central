import { forwardRef, Module } from '@nestjs/common';
import { IncidentsService } from './incidents.service';
import { IncidentsController } from './incidents.controller';
import { KeyVaultService } from 'src/context_db/DbContext.service';
import { IncidentesRepository } from './incidents.repository';
import { GatewayModule } from '../webSockets/websocket.module';
import { WebsocketRepository } from '../webSockets/websocket.repository';
import { WebsocketController } from 'src/webSockets/websockets.controller';

@Module({
  controllers: [IncidentsController],
  imports: [forwardRef(() => GatewayModule),
    GatewayModule
  ],
  providers: [
    IncidentsService,
    KeyVaultService,
    {
      provide: 'IIncidensRepostiory', // Usamos un token para la interfaz
      useClass: IncidentesRepository, // Usamos la clase concreta
    },
    WebsocketRepository,
  ],
  exports: [IncidentsService],
})
export class IncidentsModule {}
