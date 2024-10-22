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

export class AdminActiveDto{
  public readonly partition_key: string = "admin_active";
  public WebSocket_id_admin_active: string;
  public id: string;
  constructor(webSocket_id_admin_active:string, id:string){
    this.WebSocket_id_admin_active = webSocket_id_admin_active;
    this.id = id
  }
}