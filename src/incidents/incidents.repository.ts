import { KeyVaultService } from 'src/context_db/DbContext.service';
import { Incident, Location, Reporter } from './dto/incident.dto';
import { IIncidensRepostiory } from './incidets.interface'; 
import { CosmosClient } from '@azure/cosmos';
import { Injectable } from '@nestjs/common';


const databaseId: string = "risk_management"
const containerId: string = "community_upb_reports"
const partitionKey = { kind: 'Hash', paths: ['/partition_Key'] }

 
@Injectable()
export class IncidentesRepository implements IIncidensRepostiory{

  //DB conenection -------------------------------------------------------
  _keyVaultService: KeyVaultService = new KeyVaultService();
  DbConnection:CosmosClient = this._keyVaultService.getDbConnection();

 
  //DB Methods -------------------------------------------------------
  async GetAllIncidents(): Promise<Incident[]> {

    throw new Error('Method not implemented.');
  }
  async CreateIncident(_Incident: Incident): Promise<boolean> {
    
    try{
      const{ resource: CreateIncident } = await this.DbConnection
      .database(databaseId)
      .container(containerId)
      .items
      .upsert(_Incident)
      return true;

    }catch(error){
      console.error('Error creating incident: ', error);
      throw new Error('Error creating incident');
    }
   
  }
  UpdateIncident(incident: Incident): Promise<Incident> {
    throw new Error('Method not implemented.');
  }
  DeleteIncident(incident: Incident): Promise<Incident> {
    throw new Error('Method not implemented.');
  }


}