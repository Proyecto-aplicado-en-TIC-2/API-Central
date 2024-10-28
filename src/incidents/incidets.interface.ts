import { Cases, Incident } from './dto/create-incident.dto';
import { UpdateIncident } from './dto/update-incident.dto';

export interface IIncidensRepostiory {
  //-------------------- GET ------------------------
  GetAllIncidents(): Promise<Incident[]>;
  GetIncidentById(Id: string, partition_key: Cases): Promise<Incident | null>;
  //-------------------- SET ------------------------
  CreateIncident(incident: Incident): Promise<UpdateIncident | null>;
  //-------------------- UPDATE ---------------------
  UpdateIncident(incident: Incident): Promise<UpdateIncident>;
  //-------------------- DELETE ---------------------
  DeleteIncidentByID(Id: string, partition_key: Cases): Promise<Incident>;
  //-------------------- MORE -----------------------
  GetIncidentsOfTheDay(ids: string[]): Promise<Incident[]>;
}
