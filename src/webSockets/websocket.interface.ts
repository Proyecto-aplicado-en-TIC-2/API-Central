import { ReportDto } from "./websocket.dto";


export interface IWebsocketRepository{



  //-------------------- GET ------------------------
  GetState(): Promise<String>;
  //-------------------- PATCH ---------------------
  PatchReport(reportDto: ReportDto): Promise<ReportDto>;
  //-------------------- SET ------------------------
  CreateReport(incident: ReportDto): Promise<ReportDto | null>;

  //-------------------- DELETE ---------------------


}