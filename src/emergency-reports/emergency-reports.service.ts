import { Inject, Injectable } from '@nestjs/common';
import { AppValidationException } from 'src/helpers/AppValidationException';
import { UpdateEmergencyReports } from './dto/update-emergency-reports.dto';
import { IEmergencyReportsRepostiory } from './emergency-reports.interface';
import { EmergencyReports } from './dto/create-emergency-reports.dto';


@Injectable()
export class EmergencyReportsService {

  constructor(@Inject('IEmergencyReportsRepostiory') 
              private readonly emergencyReportsRepository: IEmergencyReportsRepostiory){}


  async GetAllEmergencyReports(): Promise<EmergencyReports[]> 
  {
    const operation: EmergencyReports[] = await this.emergencyReportsRepository
      .GetAllEmergencyReports()
    return operation;
  }

  async CreateEmergencyReport(emergencyReports: EmergencyReports): Promise<EmergencyReports> 
  {
      const operation: EmergencyReports | null = await this.emergencyReportsRepository
        .CreateEmergencyReport(emergencyReports)

      if(operation == null){
        throw new AppValidationException("Operation executed but wasn't changes")
      }return operation;
  }

  async GetEmergencyReportsById(Id: string): Promise<any>
  {
    const operation: EmergencyReports | null = await this.emergencyReportsRepository
      .GetEmergencyReportsById(Id)

    if(operation == null){
      throw new AppValidationException(`EmergencyReports with ID ${Id} not found.`);
    } return operation;
  }

  async UpdateEmergencyReport(updateEmergencyReports: UpdateEmergencyReports): Promise<UpdateEmergencyReports>
  {
    const operation: UpdateEmergencyReports = await this.emergencyReportsRepository
    .UpdateEmergencyReport(updateEmergencyReports);

    return operation;
  }
  async DeleteEmergencyReportByID(Id: string): Promise<EmergencyReports>
  {
    const operation: EmergencyReports = await this.emergencyReportsRepository
      .DeleteEmergencyReportByID(Id);
    
      return operation;
  }
}