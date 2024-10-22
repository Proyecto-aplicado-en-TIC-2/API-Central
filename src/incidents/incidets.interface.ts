import { Incident } from './dto/create-incident.dto';
import { UpdateIncident } from './dto/update-incident.dto';

export interface IIncidensRepostiory {
  //-------------------- GET ------------------------
  GetAllIncidents(): Promise<Incident[]>;
  GetIncidentById(Id: string): Promise<Incident | null>;
  //-------------------- SET ------------------------
  CreateIncident(incident: Incident): Promise<UpdateIncident | null>;
  //-------------------- UPDATE ---------------------
  UpdateIncident(incident: Incident): Promise<UpdateIncident>;
  //-------------------- DELETE ---------------------
  DeleteIncidentByID(Id: string): Promise<Incident>;
  //-------------------- MORE -----------------------
}
