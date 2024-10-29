import { AdminActiveDto, Cases, ReportDto } from './websocket.dto';

export interface IWebsocketRepository {
  //-------------------- GET ------------------------
  GetAdminActive(
    adminActiveDto: AdminActiveDto,
  ): Promise<AdminActiveDto | null>;
  GetAdminActiveByPartitionKey(): Promise<AdminActiveDto>;
  GetNewReports(): Promise<ReportDto[]>;
  GetReportById(id: string, partition_key: Cases): Promise<ReportDto>;
  GetReportsIdsById(id: string): Promise<string[]>
  //-------------------- PATCH ---------------------
  PatchReport(reportDto: ReportDto): Promise<ReportDto>;
  PatchAdminActive(
    adminActiveDto: AdminActiveDto,
  ): Promise<AdminActiveDto | null>;
  //-------------------- SET ------------------------
  CreateReport(incident: ReportDto): Promise<ReportDto | null>;
  CreateAdminActive(
    adminActiveDto: AdminActiveDto,
  ): Promise<AdminActiveDto | null>;
  //-------------------- DELETE ---------------------
}
