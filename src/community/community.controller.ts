import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { CommunityService } from './community.service';
import { CreateCommunityDto } from './dto/create-community.dto';

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
  async CreateUserCommunity(@Body() newUserCommunity: CreateCommunityDto, @Res() res: Response) {
    try {
      const result = await this.communityService.CreateUserCommunity(newUserCommunity);
      if (result) {
        // Respuesta para un elemento creado
        return res.status(201).send(result);
      } else {
        return res.status(200).json({})
      }
    } catch (error) {
      console.log('Error en el controlador ' + error);
    }
  }
}
