import { Module } from '@nestjs/common';
import { PrehospitalCareService } from './prehospital_care.service';
import { PrehospitalCareController } from './prehospital_care.controller';

@Module({
  controllers: [PrehospitalCareController],
  providers: [PrehospitalCareService],
})
export class PrehospitalCareModule {}
