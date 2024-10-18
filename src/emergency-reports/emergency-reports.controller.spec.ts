import { Test, TestingModule } from '@nestjs/testing';
import { EmergencyReportsController } from './emergency-reports.controller';
import { EmergencyReportsService } from './emergency-reports.service';

describe('EmergencyAlertsController', () => {
  let controller: EmergencyReportsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmergencyReportsController],
      providers: [EmergencyReportsService],
    }).compile();

    controller = module.get<EmergencyReportsController>(
      EmergencyReportsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
