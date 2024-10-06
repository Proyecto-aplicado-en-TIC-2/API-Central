import { Incident } from './dto/Incident.dto'; 
import { RelationshipWithTheUniversity, Block } from './dto/Incident.dto'; 

export interface IIncidensRepostiory {

  //-------------------- GET ------------------------
  GetAllIncidents(): Promise<Incident[]>;
  //-------------------- SET ------------------------
  CreateIncident(incident: Incident): Promise<Incident>;
  //-------------------- UPDATE ---------------------
  UpdateIncident(incident: Incident): Promise<Incident>;
  //-------------------- DELETE ---------------------
  DeleteIncident(incident: Incident): Promise<Incident>;
  //-------------------- MORE -----------------------

}

