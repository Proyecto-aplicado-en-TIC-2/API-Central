import { KeyVaultService } from 'src/context_db/DbContext.service';
import { Incident } from './dto/Incident.dto';
import { IIncidensRepostiory } from './IIncidensRepostiory'; 
import { Inject, Injectable } from '@nestjs/common';


const databaseId: string = "gdr-cosmos-db"
const containerId: string = "community_upb_reports"
const partitionKey = { kind: 'Hash', paths: ['/partitionKey'] }



export class IncidentesRepository implements IIncidensRepostiory{
  constructor(private readonly keyVaultService: KeyVaultService) {}
  
  async GetAllIncidents(): Promise<Incident[]> {

    throw new Error('Method not implemented.');
  }
  async CreateIncident(incident: Incident): Promise<Incident> {

    const dbConnection = await this.keyVaultService.getDbConnection()

    const { Incident } = await dbConnection
    .database(databaseId)
    .container(containerId)
    .items.upsert(itemBody)
     console.log(`Created family item with id:\n${itemBody.id}\n`)
    throw new Error('Method not implemented.');
  }
  UpdateIncident(incident: Incident): Promise<Incident> {
    throw new Error('Method not implemented.');
  }
  DeleteIncident(incident: Incident): Promise<Incident> {
    throw new Error('Method not implemented.');
  }


}