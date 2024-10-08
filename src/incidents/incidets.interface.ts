import { Incident } from './dto/incident.dto'; 


export interface IIncidensRepostiory {

  //-------------------- GET ------------------------
  GetAllIncidents(): Promise<Incident[]>;
  //-------------------- SET ------------------------
  CreateIncident(incident: Incident): Promise<boolean>;
  //-------------------- UPDATE ---------------------
  UpdateIncident(incident: Incident): Promise<Incident>;
  //-------------------- DELETE ---------------------
  DeleteIncident(incident: Incident): Promise<Incident>;
  //-------------------- MORE -----------------------

}

