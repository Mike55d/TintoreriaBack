import { Test, TestingModule } from '@nestjs/testing';
import { DistributionListsService } from './distribution-lists.service';

describe('DistributionListsService', () => {
  let service: DistributionListsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DistributionListsService],
    }).compile();

    service = module.get<DistributionListsService>(DistributionListsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
