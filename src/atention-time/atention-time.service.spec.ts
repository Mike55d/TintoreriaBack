import { Test, TestingModule } from '@nestjs/testing';
import { AtentionTimeService } from './atention-time.service';

describe('AtentionTimeService', () => {
  let service: AtentionTimeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AtentionTimeService],
    }).compile();

    service = module.get<AtentionTimeService>(AtentionTimeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
