import { Test, TestingModule } from '@nestjs/testing';
import { PrehospitalCareController } from './prehospital_care.controller';
import { PrehospitalCareService } from './prehospital_care.service';

describe('PrehospitalCareController', () => {
  let controller: PrehospitalCareController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PrehospitalCareController],
      providers: [PrehospitalCareService],
    }).compile();

    controller = module.get<PrehospitalCareController>(
      PrehospitalCareController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
