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
import { CommunityService } from './community.service';
import { CreateCommunityUserDto } from './dto/create-community.dto';
import { UpdateCommunityUserDto } from './dto/update-community.dto';

// todo falta el Guards
@Controller('community')
export class CommunityController {
  constructor(private readonly communityService: CommunityService) {}

  // todo falta la Authentication
  // todo falta el Middleware
  // todo falta documentar en swagger
  @Get()
  async GetAllCommunity() {
    try {
      return this.communityService.GetAllCommunityUsers();
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  @Get(':id')
  async GetCommunityById(@Param('id') Id: string) {
    try {
      return this.communityService.GetCommunityUserById(Id);
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  @Get('/mail/:mail')
  async GetCommunityByEmail(@Param('mail') mail: string) {
    try {
      return this.communityService.GetCommunityUserByEmail(mail);
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  @Post()
  async CreateUserCommunity(@Body() UserCommunity: CreateCommunityUserDto) {
    try {
      return this.communityService.CreateCommunityUser(UserCommunity);
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  @Put('/:id')
  async UpdateCommunityUserById(
    @Param('id') Id: string,
    @Body() UserCommunity: UpdateCommunityUserDto,
  ) {
    try {
      return this.communityService.UpdateCommunityUserById(Id, UserCommunity);
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  @Delete('/:id')
  async DeleteCommunityUserById(@Param('id') Id: string) {
    try {
      return await this.communityService.DeleteCommunityUserById(Id);
    } catch (e) {
      throw new BadRequestException(e);
    }
  }
}
