export enum Cases {
  Incendio = 'incendio',
  Medico = 'medico',
}

export class ReportDto {
  public WebSocket_id_attendant: string;
  public State: string;
  public reporter_Id: string;
  public aphThatTakeCare_Id: string;
  public type_case: Cases;
  public brigadista_Id: string;
  public date: {
    date: string;
    hourRequest: string;
    hourGetRequest: string;
    hourArrive: string;
    hourCloseAttentionn: string;
  };
  public readonly partition_key = "case";
}