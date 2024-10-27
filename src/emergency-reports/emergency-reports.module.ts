import { Module } from '@nestjs/common';
import { EmergencyReportsService } from './emergency-reports.service';
import { EmergencyReportsController } from './emergency-reports.controller';
import { KeyVaultService } from 'src/context_db/DbContext.service';
import { EmergencyReportsRepository } from './emergency-reports.repository';

@Module({
  controllers: [EmergencyReportsController],
  providers: [
    EmergencyReportsService,
    KeyVaultService,
    {
      provide: 'IEmergencyReportsRepostiory', // Usamos un token para la interfaz
      useClass: EmergencyReportsRepository, // Usamos la clase concreta
    },
  ],
  exports: [EmergencyReportsService]
})
export class EmergencyReportsModule {}
