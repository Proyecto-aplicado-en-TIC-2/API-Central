import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EmergencyReportsService } from './emergency-reports.service';
import { EmergencyReports } from './dto/create-emergency-reports.dto';
import { plainToInstance } from 'class-transformer';
import { GenericError } from 'src/helpers/GenericError';
import { Roles } from 'src/authorization/decorators/roles.decorator';
import { Role } from 'src/authorization/role.enum';

@Controller('emergency-reports')
export class EmergencyReportsController {
  public constructor(
    private readonly emergencyReportsService: EmergencyReportsService,
  ) {}
  @Roles(Role.APH, Role.Administration)
  @Post()
  async CreateEmergencyReport(
    @Body() emergencyReports: Record<string, any>,
  ): Promise<any> {
    try {
      const emergencyReports_obj: EmergencyReports = plainToInstance(
        EmergencyReports,
        emergencyReports,
      );
      return await this.emergencyReportsService.CreateEmergencyReport(
        emergencyReports_obj,
      );
    } catch (error) {
      throw new GenericError('CreateEmergencyReport', error);
    }
  }
  @Roles(Role.Administration)
  @Get()
  async GetAllEmergencyReports(): Promise<any> {
    const emergencyReports: EmergencyReports[] =
      await this.emergencyReportsService.GetAllEmergencyReports();
    return emergencyReports;
  }

  @Roles(Role.Administration)
  @Get('/:Id')
  async GetEmergencyReportsById(@Param('Id') Id: string): Promise<any> {
    try {
      const emergencyReports: EmergencyReports =
        await this.emergencyReportsService.GetEmergencyReportsById(Id);
      return emergencyReports;
    } catch (error) {
      throw new GenericError('GetEmergencyReportsById', error);
    }
  }

  @Roles(Role.Administration)
  @Delete('/:Id')
  async DeleteEmergencyReportByID(@Param('Id') Id: string): Promise<any> {
    try {
      const emergencyReports: EmergencyReports =
        await this.emergencyReportsService.DeleteEmergencyReportByID(Id);

      return `The RmergencyReport was deleted succefully: ${emergencyReports}`;
    } catch (error) {
      throw new GenericError('DeleteEmergencyReportByID', error);
    }
  }
  @Roles(Role.Administration)
  @Patch()
  async UpdateEmergencyReport(
    @Body() emergencyReports: Record<string, any>,
  ): Promise<any> {
    try {
      const emergencyReports_obj: EmergencyReports = plainToInstance(
        EmergencyReports,
        emergencyReports,
      );
      const operation: EmergencyReports =
        await this.emergencyReportsService.UpdateEmergencyReport(
          emergencyReports_obj,
        );

      return (
        'EmergencyReports actualizado correctamente: ' +
        JSON.stringify(operation)
      );
    } catch (error) {
      throw new GenericError('UpdateEmergencyReport', error);
    }
  }
}
