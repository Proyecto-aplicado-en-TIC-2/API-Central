import { Module } from '@nestjs/common';
import { PrehospitalCareService } from './prehospital_care.service';
import { PrehospitalCareController } from './prehospital_care.controller';
import { KeyVaultService } from '../context_db/DbContext.service';
import { PrehospitalCareRepository } from './repositories/prehospital_care.repository';

@Module({
  controllers: [PrehospitalCareController],
  providers: [
    PrehospitalCareService,
    KeyVaultService,
    PrehospitalCareRepository,
  ],
})
export class PrehospitalCareModule {}
