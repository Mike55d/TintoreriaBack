import { Test, TestingModule } from '@nestjs/testing';
import { LogsForwardingController } from './logs-forwarding.controller';
import { LogsForwardingService } from './logs-forwarding.service';

describe('LogsForwardingController', () => {
  let controller: LogsForwardingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LogsForwardingController],
      providers: [LogsForwardingService],
    }).compile();

    controller = module.get<LogsForwardingController>(LogsForwardingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
