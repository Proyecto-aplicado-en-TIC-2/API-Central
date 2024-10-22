export enum Cases {
  Incendio,
  Medico, 
  Estrctural
}

export class ReportDto {
  public id: string;
  public WebSocket_id_attendant: string;
  public brigadista_Id: string;
  public reporter_Id: string;
  public aphThatTakeCare_Id: string;
  public partition_key: Cases;
  public State: string;
  public date: {
    date: string;
    hourRequest: string;
    hourArrive: string;
    hourCloseAttentionn: string;
  };  
}