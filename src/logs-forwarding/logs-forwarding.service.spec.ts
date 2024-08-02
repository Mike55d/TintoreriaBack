import { Test, TestingModule } from '@nestjs/testing';
import { LogsForwardingService } from './logs-forwarding.service';

describe('LogsForwardingService', () => {
  let service: LogsForwardingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LogsForwardingService],
    }).compile();

    service = module.get<LogsForwardingService>(LogsForwardingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
