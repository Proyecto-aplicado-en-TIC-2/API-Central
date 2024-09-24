import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { TestDB } from './Services/test.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly keyVaultService: TestDB

  ) {}

  @Get('/hello')
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('/dbtest')
  async DBtest(): Promise<void>{
    return await this.keyVaultService.GetAllChildrensInAFamily();
  }
}
