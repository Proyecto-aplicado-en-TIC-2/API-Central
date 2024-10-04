import { Module } from '@nestjs/common';
import { BrigadiersService } from './brigadiers.service';
import { BrigadiersController } from './brigadiers.controller';

@Module({
  controllers: [BrigadiersController],
  providers: [BrigadiersService],
})
export class BrigadiersModule {}
