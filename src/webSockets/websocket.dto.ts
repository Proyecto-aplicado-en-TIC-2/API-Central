import { EmergencyReports, Quadrant } from "src/emergency-reports/dto/create-emergency-reports.dto";

export enum Cases {
  Incendio,
  Medico,
  Estrctural,
}

export class ReportDto {
  public id?: string;
  public WebSocket_id_attendant?: string;
  public brigadista_Id?: string;
  public reporter_Id?: string;
  public aphThatTakeCare_Id?: string;
  public partition_key?: Cases;
  public State?: string;

  public date?: {
    date?: string;
    hourRequest?: string;
    hourArrive?: string;
    hourCloseAttentionn?: string;
  };
}

export class UserWebsocketInfo {
  public id: string;
  public partition_key: string;
  public webSocketId: string;
  public cuadrant?: Quadrant;
  public inService: boolean;
}

export class PayLoadDto {
  public user_id: string;
  public case_id: string;
  public partition_key: Cases;
}

export class AphCases extends EmergencyReports {
  public help?: {
    user_id?: string;
    case_id?: string;
    partition_key?: Cases;
  };
  public hourArrive?: string;
  public close_case?: string;
  public on_the_way?: string;
}
