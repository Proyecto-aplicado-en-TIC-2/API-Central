import { Injectable } from '@nestjs/common';
import { KeyVaultService } from '../Context/DbContext.service';

@Injectable()
export class TestDB
{ 
  constructor(private readonly keyVaultService: KeyVaultService) {}
  async GetAllChildrensInAFamily(): Promise<void>
  {
    const dbConnection = await this.keyVaultService.getDbConnection()
    console.log(`Querying container Items`)

    // query to return all children in a family
    // Including the partition key value of country in the WHERE filter results in a more efficient query
    const querySpec = {
      query: 'SELECT VALUE r.children FROM root r WHERE r.partitionKey = @country',
      parameters: [
        {
          name: '@country',
          value: 'Italy'
        }
      ]
    }

    const { resources: results } = await dbConnection
      .database('ToDoList')
      .container('Items')
      .items.query(querySpec)
      .fetchAll()
    for (var queryResult of results) {
      let resultString = JSON.stringify(queryResult)
      console.log(`\tQuery returned ${resultString}\n`)
    }
  }
}