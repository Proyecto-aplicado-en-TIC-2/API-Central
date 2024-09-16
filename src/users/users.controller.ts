import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get()
  async GetAllUsers() {
    return { message: 'GetAllUsers OK' };
  }

  @Get(':id')
  async GetUserId(@Param('id') id: string) {
    return { message: 'GetUserId OK' };
  }

  @Get('GetUserEmail')
  async GetUserEmail() {
    return { message: 'GetUserEmail OK' };
  }

  @Get('GetUserIdUpbCommunity/:id')
  async GetUserIdUpbCommunity(@Param('id') id: string) {
    return { message: 'GetUserIdUpbCommunity OK' };
  }

  @Get('RecoverPassword')
  async RecoverPassword() {
    return { message: 'RecoverPassword OK' };
  }

  @Post('CreateUser')
  async CreateUser() {
    return { message: 'CreateUser OK' };
  }

  @Put('UpdateUserServiceStatusId/:id')
  async UpdateUserServiceStatusId(@Param('id') id: string) {
    return { message: 'UpdateUserServiceStatusId OK' };
  }

  @Put('UpdateUserInformationId/:id')
  async UpdateUserInformationId(@Param('id') id: string) {
    return { message: 'UpdateUserInformationId OK' };
  }

  @Put('UpdatePasswordId/:id')
  async UpdatePasswordId(@Param('id') id: string) {
    return { message: 'UpdatePasswordId OK' };
  }

  @Delete('DeleteUserId/:id')
  async DeleteUserId(@Param('id') id: string) {
    return { message: 'DeleteUserId OK' };
  }
}
