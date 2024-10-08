import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PrehospitalCareService } from './prehospital_care.service';
import { CreateAphDto } from './dto/create-aph.dto';
import { UpdateAphDto } from './dto/update-aph.dto';
import { Roles } from '../authorization/decorators/roles.decorator';
import { Role } from '../authorization/role.enum';

@Controller('prehospital-care')
export class PrehospitalCareController {
  constructor(
    private readonly prehospitalCareService: PrehospitalCareService,
  ) {}

  @Roles(Role.Administration, Role.APH)
  @Get()
  async GetAllAPHs() {
    try {
      return this.prehospitalCareService.GetAllAPHs();
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  @Roles(Role.Administration, Role.APH)
  @Get(':id')
  async GetAPHById(@Param('id') id: string) {
    try {
      return this.prehospitalCareService.GetAPHById(id);
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  @Roles(Role.Administration, Role.APH)
  @Get('/mail/:mail')
  async GetAPHByMail(@Param('mail') mail: string) {
    try {
      return this.prehospitalCareService.GetAPHByMail(mail);
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  @Roles(Role.Administration)
  @Post()
  async CreateAPH(@Body() aph: CreateAphDto) {
    try {
      return this.prehospitalCareService.CreateAPH(aph);
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  @Roles(Role.Administration, Role.APH)
  @Put('/:id')
  async UpdateAPHById(@Param('id') id: string, @Body() aph: UpdateAphDto) {
    try {
      return this.prehospitalCareService.UpdateAPHById(id, aph);
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  @Roles(Role.Administration)
  @Delete('/:id')
  async DeleteAPHById(@Param('id') id: string) {
    try {
      return await this.prehospitalCareService.DeleteAPHById(id);
    } catch (e) {
      throw new BadRequestException(e);
    }
  }
}
