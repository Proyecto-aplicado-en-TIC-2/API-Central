import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CommunityService } from './community.service';
import { Community } from './dto/community.dto';
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

  /*  @Post()
  async CreateUserCommunity(@Body() newUserCommunity: CreateCommunityDto) {
    try {
      console.log('body' + JSON.stringify(newUserCommunity));
      return this.communityService.CreateUserCommunity(newUserCommunity);
    } catch (error) {
      console.log('Error en el controlador ' + error);
    }
  }*/
}
