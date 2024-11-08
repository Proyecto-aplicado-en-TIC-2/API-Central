import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { plainToInstance } from 'class-transformer';
import { GenericError } from 'src/helpers/GenericError';
import { Roles } from '../authorization/decorators/roles.decorator';
import { Role } from '../authorization/role.enum';

@Controller('admins')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Roles(Role.Administration)
  @Post()
  async createAdmin(@Body() admin: Record<string, any>): Promise<any> {
    try {
      const adminObj: CreateAdminDto = plainToInstance(CreateAdminDto, admin);
      return await this.adminService.createAdmin(adminObj);
    } catch (error) {
      throw new GenericError('CreateAdmin', error);
    }
  }

  @Roles(Role.Administration)
  @Get()
  async getAllAdmins(): Promise<any> {
    return await this.adminService.getAllAdmins();
  }

  @Roles(Role.Administration)
  @Get('/:id')
  async getAdminById(@Param('id') id: string): Promise<any> {
    try {
      return await this.adminService.getAdminById(id);
    } catch (error) {
      throw new GenericError('GetAdminById', error);
    }
  }

  @Roles(Role.Administration)
  @Delete('/:id')
  async deleteAdminById(@Param('id') id: string): Promise<any> {
    try {
      return await this.adminService.deleteAdminById(id);
    } catch (error) {
      throw new GenericError('DeleteAdmin', error);
    }
  }

  @Roles(Role.Administration)
  @Put('/:id')
  async updateAdmin(
    @Param('id') id: string,
    @Body() admin: UpdateAdminDto,
  ): Promise<any> {
    try {
      return await this.adminService.updateAdmin(id, admin);
    } catch (error) {
      throw new GenericError('UpdateAdmin', error);
    }
  }
}
