import { Test, TestingModule } from '@nestjs/testing';
import { GeneralPricesController } from './general-prices.controller';
import { GeneralPricesService } from './general-prices.service';

describe('GeneralPricesController', () => {
  let controller: GeneralPricesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GeneralPricesController],
      providers: [GeneralPricesService],
    }).compile();

    controller = module.get<GeneralPricesController>(GeneralPricesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
