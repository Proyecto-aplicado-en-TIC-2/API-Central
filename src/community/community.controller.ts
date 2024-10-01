import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { CommunityService } from './community.service';
import { CreateCommunityDto } from './dto/create-community.dto';
import { UpdateCommunityDto } from './dto/update-community.dto';

// todo falta el Guards
@Controller('community')
export class CommunityController {
  constructor(private readonly communityService: CommunityService) {}

  // todo falta la Authentication
  // todo falta el Middleware
  // todo falta documentar en swagger
  @Get()
  async GetAllCommunity() {
    return this.communityService.GetAllCommunity();
  }

  @Get('/:Id/:CommunityKey')
  async GetCommunityById(
    @Param('Id') Id: string,
    @Param('CommunityKey') CommunityKey: string,
  ) {
    return this.communityService.GetCommunityById(Id, CommunityKey);
  }

  @Get('/:Email')
  async GetCommunityByEmail(@Param('Email') Email: string) {
    return this.communityService.GetCommunityByEmail(Email);
  }

  @Post()
  async CreateUserCommunity(
    @Body() newUserCommunity: CreateCommunityDto,
    @Res() res: Response,
  ) {
    try {
      const result =
        await this.communityService.CreateUserCommunity(newUserCommunity);
      if (result) {
        // Respuesta para un elemento creado
        return res.status(201).send(result);
      } else {
        return res.status(200).json({});
      }
    } catch (error) {
      console.log('Error en el controlador ' + error);
    }
  }

  @Put('/:Id/:UserCommunityKey')
  async UpdateCommunityUserById(
    @Param('Id') id: string,
    @Param('UserCommunityKey') userCommunityKey: string,
    @Body() updateUserCommunity: UpdateCommunityDto,
    @Res() res: Response,
  ) {
    try {
      const result = await this.communityService.UpdateCommunityUserById(
        id,
        userCommunityKey,
        updateUserCommunity,
      );
      if (result) {
        // Respuesta para un elemento creado
        return res.status(201).send(result);
      } else {
        return res.status(200).json({});
      }
    } catch (error) {
      console.log('Error en el controlador ' + error);
    }
  }

  @Delete('/:Id/:UserCommunityKey')
  async DeleteCommunityUserById(
    @Param('Id') id: string,
    @Param('UserCommunityKey') userCommunityKey: string,
  ) {
    try {
      return await this.communityService.DeleteCommunityUserById(
        id,
        userCommunityKey,
      );
    } catch (e) {
      console.log('Error en el controlador ' + e);
    }
  }
}
