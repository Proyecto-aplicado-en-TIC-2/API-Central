import { Inject, Injectable } from '@nestjs/common';
import { Incident, Reporter, Location } from './dto/incident.dto';
import { IIncidensRepostiory } from './incidets.interface';


@Injectable()
export class IncidentsService {

  constructor(@Inject('IIncidensRepostiory') 
              private readonly incidensRepostiory: IIncidensRepostiory){}

  async CreateIncident(CreateIncident: Incident): Promise<Boolean> {
    try{
      const Operation: Boolean = await this.incidensRepostiory
      .CreateIncident(CreateIncident)
      if(Operation == true){
        return true;
      }
    }catch(error){
      console.error('Error creating incident: ', error);
      throw new Error('Error creating incident');
    }
  }

  findAll() {
    return `This action returns all incidents`;
  }

  findOne(id: number) {
    return `This action returns a #${id} incident`;
  }

  update(id: number, updateIncidentDto: Incident) {
    return `This action updates a #${id} incident`;
  }

  remove(id: number) {
    return `This action removes a #${id} incident`;
  }
}
