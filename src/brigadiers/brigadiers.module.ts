import { Module } from '@nestjs/common';
import { BrigadiersService } from './brigadiers.service';
import { BrigadiersController } from './brigadiers.controller';
import { KeyVaultService } from '../context_db/DbContext.service';
import { BrigadiersRepository } from './repositories/brigadiers.repository';

@Module({
  controllers: [BrigadiersController],
  providers: [BrigadiersService, KeyVaultService, BrigadiersRepository],
  exports: [BrigadiersService],
})
export class BrigadiersModule {}
