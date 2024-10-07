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
import { BrigadiersService } from './brigadiers.service';
import { CreateBrigadierDto } from './dto/create-brigadiers.dto';
import { UpdateBrigadiersDto } from './dto/update-brigadiers.dto';
import { Role } from '../authorization/role.enum';
import { Roles } from '../authorization/decorators/roles.decorator';

@Controller('brigadiers')
export class BrigadiersController {
  constructor(private readonly brigadiersService: BrigadiersService) {}

  @Roles(Role.Administration, Role.Brigadiers)
  @Get()
  async GetAllBrigadiers() {
    try {
      return this.brigadiersService.GetAllBrigadiers();
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  @Get(':id')
  async GetBrigadierById(@Param('id') id: string) {
    try {
      return this.brigadiersService.GetBrigadierById(id);
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  @Get('/mail/:mail')
  async GetBrigadierByEmail(@Param('mail') mail: string) {
    try {
      return this.brigadiersService.GetBrigadierByEmail(mail);
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  @Post()
  async CreateBrigade(@Body() brigadier: CreateBrigadierDto) {
    try {
      return this.brigadiersService.CreateBrigade(brigadier);
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  @Put('/:id')
  async UpdateBrigadiersById(
    @Param('id') id: string,
    @Body() brigadier: UpdateBrigadiersDto,
  ) {
    try {
      return this.brigadiersService.UpdateBrigadiersById(id, brigadier);
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  @Delete('/:id')
  async DeleteBrigadiersById(@Param('id') id: string) {
    try {
      return await this.brigadiersService.DeleteBrigadiersById(id);
    } catch (e) {
      throw new BadRequestException(e);
    }
  }
}
