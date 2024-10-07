import { Module } from '@nestjs/common';
import { BrigadiersService } from './brigadiers.service';
import { BrigadiersController } from './brigadiers.controller';
import { KeyVaultService } from '../context_db/DbContext.service';
import { BrigadiersRepository } from './repositories/brigadiers.repository';
import { AuthGuard } from '../auth/auth.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  controllers: [BrigadiersController],
  providers: [
    BrigadiersService,
    KeyVaultService,
    BrigadiersRepository,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  exports: [BrigadiersService],
})
export class BrigadiersModule {}
