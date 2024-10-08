import { Incident } from './dto/incident.dto'; 


export interface IIncidensRepostiory {

  //-------------------- GET ------------------------
  GetAllIncidents(): Promise<Incident[]>;
  GetIncidentById(Id: string): Promise<Incident | null>;
  //-------------------- SET ------------------------
  CreateIncident(incident: Incident): Promise<Incident | null>;
  //-------------------- UPDATE ---------------------
  UpdateIncident(Id: string): Promise<Incident>;
  //-------------------- DELETE ---------------------
  DeleteIncident(Id: string): Promise<Incident>;
  //-------------------- MORE -----------------------

}

