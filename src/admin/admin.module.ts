import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { KeyVaultService } from '../context_db/DbContext.service';
import { AdminRepository } from './admin.repository';

@Module({
  controllers: [AdminController],
  providers: [AdminService, KeyVaultService, AdminRepository],
  exports: [AdminService],
})
export class AdminModule {}
