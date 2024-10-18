import { EmergencyReports } from './dto/create-emergency-reports.dto'; 
import { UpdateEmergencyReports } from './dto/update-emergency-reports.dto'


export interface IEmergencyReportsRepostiory {

  //-------------------- GET ------------------------
  GetAllEmergencyReports(): Promise<EmergencyReports[]>;
  GetEmergencyReportsById(Id: string): Promise<EmergencyReports | null>;
  //-------------------- SET ------------------------
  CreateEmergencyReport(incident: EmergencyReports): Promise<EmergencyReports | null>;
  //-------------------- UPDATE ---------------------
  UpdateEmergencyReport(incident: EmergencyReports): Promise<UpdateEmergencyReports>;
  //-------------------- DELETE ---------------------
  DeleteEmergencyReportByID(Id: string): Promise<EmergencyReports>;
  //-------------------- MORE -----------------------

}

