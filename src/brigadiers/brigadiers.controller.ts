import { Controller } from '@nestjs/common';
import { BrigadiersService } from './brigadiers.service';

@Controller('brigadiers')
export class BrigadiersController {
  constructor(private readonly brigadiersService: BrigadiersService) {}
}
