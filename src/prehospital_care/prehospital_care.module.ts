import { Module } from '@nestjs/common';
import { PrehospitalCareService } from './prehospital_care.service';
import { PrehospitalCareController } from './prehospital_care.controller';
import { KeyVaultService } from '../context_db/DbContext.service';
import { PrehospitalCareRepository } from './repositories/prehospital_care.repository';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '../auth/auth.guard';

@Module({
  controllers: [PrehospitalCareController],
  providers: [
    PrehospitalCareService,
    KeyVaultService,
    PrehospitalCareRepository,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  exports: [PrehospitalCareService],
})
export class PrehospitalCareModule {}
