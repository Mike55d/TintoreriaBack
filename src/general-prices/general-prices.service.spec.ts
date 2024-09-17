import { Test, TestingModule } from '@nestjs/testing';
import { GeneralPricesService } from './general-prices.service';

describe('GeneralPricesService', () => {
  let service: GeneralPricesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GeneralPricesService],
    }).compile();

    service = module.get<GeneralPricesService>(GeneralPricesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
