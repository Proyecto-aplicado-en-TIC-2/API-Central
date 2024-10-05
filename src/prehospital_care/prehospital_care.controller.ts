import { BadRequestException, Controller, Get } from '@nestjs/common';
import { PrehospitalCareService } from './prehospital_care.service';

@Controller('prehospital-care')
export class PrehospitalCareController {
  constructor(
    private readonly prehospitalCareService: PrehospitalCareService,
  ) {}

  @Get()
  async GetAllAPHs() {
    try {
      return this.prehospitalCareService.GetAllAPHs();
    } catch (e) {
      throw new BadRequestException(e);
    }
  }
}
