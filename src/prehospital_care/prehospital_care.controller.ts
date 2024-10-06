import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PrehospitalCareService } from './prehospital_care.service';
import { CreateAphDto } from './dto/create-aph.dto';
import { UpdateAphDto } from './dto/update-aph.dto';

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

  @Post()
  async CreateAPH(@Body() aph: CreateAphDto) {
    try {
      return this.prehospitalCareService.CreateAPH(aph);
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  @Put('/:id')
  async UpdateAPHById(@Param('id') id: string, @Body() aph: UpdateAphDto) {
    try {
      return this.prehospitalCareService.UpdateAPHById(id, aph);
    } catch (e) {
      throw new BadRequestException(e);
    }
  }
}
