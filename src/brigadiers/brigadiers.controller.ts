import { BadRequestException, Controller, Get } from '@nestjs/common';
import { BrigadiersService } from './brigadiers.service';

@Controller('brigadiers')
export class BrigadiersController {
  constructor(private readonly brigadiersService: BrigadiersService) {}

  @Get()
  async GetAllBrigadiers() {
    try {
      return this.brigadiersService.GetAllBrigadiers();
    } catch (e) {
      throw new BadRequestException(e);
    }
  }
}
