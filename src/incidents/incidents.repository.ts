import { KeyVaultService } from 'src/context_db/DbContext.service';
import { Incident, Location, Reporter } from './dto/incident.dto';
import { IIncidensRepostiory } from './incidets.interface'; 
import { CosmosClient } from '@azure/cosmos';
import { BadGatewayException, Inject, Injectable } from '@nestjs/common';
import { DbOperationException } from 'src/helpers/DbOperationException';
import { plainToInstance } from 'class-transformer';


const databaseId: string = "risk_management"
const containerId: string = "community_upb_reports"
const partitionKey = { kind: 'Hash', paths: ['/partition_Key'] }

 
@Injectable()
export class IncidentesRepository implements IIncidensRepostiory{

  //DB conenection -------------------------------------------------------
  constructor(@Inject(KeyVaultService) private DbConnection: KeyVaultService) {}



  //DB Methods -------------------------------------------------------
  async GetAllIncidents(): Promise<Incident[]> 
  {
    try {
      const query = 
      {
        query: 'SELECT * FROM c',
      }
      const { resources: results } = await this.DbConnection
        .getDbConnection()
        .database(databaseId)
        .container(containerId)
        .items.query(query)
        .fetchAll();

      return results;
      
    } catch (error) {
      throw new DbOperationException(error.message);
    }
  }

  async GetIncidentById(Id: string): Promise<Incident | null> 
  {
    try {
      const { resource: item } = await this.DbConnection
      .getDbConnection()
      .database(databaseId)
      .container(containerId)
      .item(Id, containerId)
      .read();

      if(item){
        const incident_obj: Incident = plainToInstance(Incident, item);
        return incident_obj;
      }return null;
        
    } catch (error) {
      throw new DbOperationException(error.message);
    }
  }

  async CreateIncident(incident: Incident): Promise<Incident | null> {
    try{

      const{ resource: CreateIncident } = await this.DbConnection
      .getDbConnection()
      .database(databaseId)
      .container(containerId)
      .items
      .upsert(incident)

      if(CreateIncident) {
        return CreateIncident as unknown as Incident;
      }return null;

    }catch(error){
      throw new DbOperationException(error.message);
    }
   
  }

  UpdateIncident(Id: string): Promise<Incident> {
    throw new Error('Method not implemented.');
  }

  DeleteIncident(Id: string): Promise<Incident> {
    throw new Error('Method not implemented.');
  }


}