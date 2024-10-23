import { AdminActiveDto, Cases, ReportDto } from "./websocket.dto";


export interface IWebsocketRepository{



  //-------------------- GET ------------------------
  GetState(id: string, partition_key_Cases: Cases): Promise<Cases>
  GetAdminActive(adminActiveDto: AdminActiveDto): Promise<AdminActiveDto | null>;
  GetAdminActiveByPartitionKey(): Promise<AdminActiveDto>
  //-------------------- PATCH ---------------------
  PatchReport(reportDto: ReportDto): Promise<ReportDto>;
  PatchAdminActive(adminActiveDto: AdminActiveDto): Promise<AdminActiveDto | null>;
  //-------------------- SET ------------------------
  CreateReport(incident: ReportDto): Promise<ReportDto | null>;
  CreateAdminActive(adminActiveDto: AdminActiveDto): Promise<AdminActiveDto | null>;
  //-------------------- DELETE ---------------------


}