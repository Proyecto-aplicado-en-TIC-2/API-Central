import { Module } from '@nestjs/common';
import { IncidentsService } from './incidents.service';
import { IncidentsController } from './incidents.controller';
import { KeyVaultService } from 'src/context_db/DbContext.service';
import { IncidentesRepository } from './incidents.repository';

@Module({
  controllers: [IncidentsController],
  providers: [
    IncidentsService,
    KeyVaultService,
    {
      provide: 'IIncidensRepostiory', // Usamos un token para la interfaz
      useClass: IncidentesRepository, // Usamos la clase concreta
    },
  ],
  exports: [IncidentsService]
})
export class IncidentsModule {}
