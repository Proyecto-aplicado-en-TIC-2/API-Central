import { Inject, Injectable } from '@nestjs/common';
import { Incident, Reporter, Location } from './dto/incident.dto';
import { IIncidensRepostiory } from './incidets.interface';
import { AppValidationException } from 'src/helpers/AppValidationException';




@Injectable()
export class IncidentsService {

  constructor(@Inject('IIncidensRepostiory') 
              private readonly incidensRepostiory: IIncidensRepostiory){}


  async GetAllIncidents(): Promise<Incident[]> 
  {
    const operation: Incident[] = await this.incidensRepostiory
      .GetAllIncidents()
    return operation;
  }

  async CreateIncident(incidente: Incident): Promise<Incident> 
  {
    
      const operation: Incident | null = await this.incidensRepostiory
        .CreateIncident(incidente)

      if(operation == null){
        throw new AppValidationException("Operation executed but wasn't changes")
      }return operation;
  }

  async GetIncidentById(Id: string): Promise<any>
  {
    const operation: Incident | null = await this.incidensRepostiory
      .GetIncidentById(Id)

    if(operation == null){
      throw new AppValidationException(`Incident with ID ${Id} not found.`);
    }

    if(operation == null){
      throw new AppValidationException("There is not nay any item with the id: " + Id)
    }return operation;
  }
}