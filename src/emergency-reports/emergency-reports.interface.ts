import { EmergencyReports } from './dto/create-emergency-reports.dto';

export interface IEmergencyReportsRepostiory {
  //-------------------- GET ------------------------
  GetAllEmergencyReports(): Promise<EmergencyReports[]>;
  GetEmergencyReportsById(Id: string): Promise<EmergencyReports | null>;
  GetReportsFromList(ids: string[]): Promise<EmergencyReports[]>
  //-------------------- SET ------------------------
  CreateEmergencyReport(
    incident: EmergencyReports,
  ): Promise<EmergencyReports | null>;
  //-------------------- UPDATE ---------------------
  UpdateEmergencyReport(incident: EmergencyReports): Promise<EmergencyReports>;
  //-------------------- DELETE ---------------------
  DeleteEmergencyReportByID(Id: string): Promise<EmergencyReports>;
  //-------------------- MORE -----------------------
}
