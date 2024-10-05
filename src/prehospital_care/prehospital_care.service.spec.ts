import { Test, TestingModule } from '@nestjs/testing';
import { PrehospitalCareService } from './prehospital_care.service';

describe('PrehospitalCareService', () => {
  let service: PrehospitalCareService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrehospitalCareService],
    }).compile();

    service = module.get<PrehospitalCareService>(PrehospitalCareService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
