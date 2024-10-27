import { Module } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { StatisticsController } from './statistics.controller';
import { KeyVaultService } from 'src/context_db/DbContext.service';
import { StatisticsRepostiory } from './statistics.repository';

@Module({
  controllers: [StatisticsController],
  providers: [
    StatisticsService,
    KeyVaultService,
    {
      provide: 'IStatisticsRepostiory', // Usamos un token para la interfaz
      useClass: StatisticsRepostiory, // Usamos la clase concreta
    },
  ],
  exports: [StatisticsService]
})
export class IncidentsModule {}
