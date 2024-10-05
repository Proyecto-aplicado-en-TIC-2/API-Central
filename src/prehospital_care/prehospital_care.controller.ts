import { Controller } from '@nestjs/common';
import { PrehospitalCareService } from './prehospital_care.service';

@Controller('prehospital-care')
export class PrehospitalCareController {
  constructor(
    private readonly prehospitalCareService: PrehospitalCareService,
  ) {}
}
