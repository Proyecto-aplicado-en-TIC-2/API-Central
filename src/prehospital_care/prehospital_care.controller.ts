import { BadRequestException, Controller, Get, Param } from '@nestjs/common';
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

  @Get(':id')
  async GetAPHById(@Param('id') id: string) {
    try {
      return this.prehospitalCareService.GetAPHById(id);
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  @Get('/mail/:mail')
  async GetAPHByMail(@Param('mail') mail: string) {
    try {
      return this.prehospitalCareService.GetAPHByMail(mail);
    } catch (e) {
      throw new BadRequestException(e);
    }
  }
}
