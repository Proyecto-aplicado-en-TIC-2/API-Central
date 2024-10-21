import { ReportDto } from "./websocket.dto";


export interface IwebsocketRepository{



  //-------------------- GET ------------------------
  GetState(): Promise<String>;
  //-------------------- PATCH ---------------------
  PatchReport(reportDto: ReportDto): Promise<ReportDto>;
  //-------------------- DELETE ---------------------


}