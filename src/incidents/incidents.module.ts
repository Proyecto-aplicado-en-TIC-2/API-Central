import { Module } from '@nestjs/common';
import { IncidentsService } from './incidents.service';
import { IncidentsController } from './incidents.controller';
import { KeyVaultService } from 'src/context_db/DbContext.service';
import { IncidentesRepository } from './incidents.repository';
import { IIncidensRepostiory } from './incidets.interface';

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
})
export class IncidentsModule {}