import { UserWebsocketInfo, Cases, ReportDto } from './websocket.dto';

export interface IWebsocketRepository {
  //-------------------- GET ------------------------
 
  GetNewReports(): Promise<ReportDto[]>;
  GetOpenReports(): Promise<ReportDto[]>;
  GetReportById(id: string, partition_key: Cases): Promise<ReportDto>;
  GetReportsIdsById(id: string): Promise<string[]>
  GetReportsColsedIdsById(id: string): Promise<string[]>

  GetWebsocketInfo(id: string): Promise<UserWebsocketInfo>;
  GetWebsocketInfoAdmin(): Promise<UserWebsocketInfo> 
  //-------------------- PATCH ---------------------
  PatchWebsocketInfo(userWebsocketIfo: UserWebsocketInfo): Promise<UserWebsocketInfo>;
  PatchReport(reportDto: ReportDto): Promise<ReportDto>;

  //-------------------- SET ------------------------
  CreatetWebsocketInfo(userWebsocketIfo: UserWebsocketInfo): Promise<UserWebsocketInfo>;
  CreateReport(incident: ReportDto): Promise<ReportDto | null>;

  //-------------------- DELETE ---------------------
  DeleteWebsocketInfo(id: string,  partition_key: string): Promise<boolean>;
}
