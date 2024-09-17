import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestDB } from './Services/test.service';
import { KeyVaultService } from './Context/DbContext.service';


@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, TestDB, KeyVaultService], 
})
export class AppModule {}
