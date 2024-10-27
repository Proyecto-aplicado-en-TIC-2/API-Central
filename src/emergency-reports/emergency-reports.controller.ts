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

@Controller('emergency-reports')
export class EmergencyReportsController {
  public constructor(
    private readonly emergencyReportsService: EmergencyReportsService,
  ) {}

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
  @Get()
  async GetAllEmergencyReports(): Promise<any> {
    const emergencyReports: EmergencyReports[] =
      await this.emergencyReportsService.GetAllEmergencyReports();
    return emergencyReports;
  }

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
