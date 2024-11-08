import { Test, TestingModule } from '@nestjs/testing';
import { BrigadiersController } from './brigadiers.controller';
import { BrigadiersService } from './brigadiers.service';

describe('BrigadiersController', () => {
  let controller: BrigadiersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BrigadiersController],
      providers: [BrigadiersService],
    }).compile();

    controller = module.get<BrigadiersController>(BrigadiersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
