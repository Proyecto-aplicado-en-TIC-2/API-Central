import { Injectable, OnModuleInit } from '@nestjs/common';
import { SecretClient } from '@azure/keyvault-secrets';
import { DefaultAzureCredential } from '@azure/identity';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class KeyVaultService implements OnModuleInit {
  private client: SecretClient;
  private dbConnection: any;

  constructor() {
    const credential = new DefaultAzureCredential();
    const vaultName: string = process.env.KEY_VAULT_NAME!;
    const url = `https://${vaultName}.vault.azure.net/`;
    this.client = new SecretClient(url, credential);
  }

  async onModuleInit() {
    const endpoint: string = process.env.SECRET_NAME_ENDPOINT!;
    const key: string = process.env.SECRET_NAME_API_KEY!;
    this.dbConnection = await this.initializeDbConnection(endpoint, key);
  }

  private async initializeDbConnection(
    endpoint: string,
    key: string,
  ): Promise<any> {
    const options = {
      endpoint: await this.getSecret(endpoint),
      key: await this.getSecret(key),
      userAgentSuffix: 'DbContext',
    };

    const { CosmosClient } = require('@azure/cosmos');
    return new CosmosClient(options);
  }

  async getSecret(secretName: string): Promise<string> {
    const secret = await this.client.getSecret(secretName);
    return secret.value!;
  }

  getDbConnection(): any {
    return this.dbConnection;
  }
}
//penesito
