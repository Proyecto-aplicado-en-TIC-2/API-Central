import { Test, TestingModule } from '@nestjs/testing';
import { EmergencyReportsService } from './emergency-reports.service';

describe('EmergencyAlertsService', () => {
  let service: EmergencyReportsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmergencyReportsService],
    }).compile();

    service = module.get<EmergencyReportsService>(EmergencyReportsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
