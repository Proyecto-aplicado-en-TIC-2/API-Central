import { Test, TestingModule } from '@nestjs/testing';
import { BrigadiersService } from './brigadiers.service';

describe('BrigadiersService', () => {
  let service: BrigadiersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BrigadiersService],
    }).compile();

    service = module.get<BrigadiersService>(BrigadiersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
