import { Test, TestingModule } from '@nestjs/testing';
import { AtentionTimeController } from './atention-time.controller';
import { AtentionTimeService } from './atention-time.service';

describe('AtentionTimeController', () => {
  let controller: AtentionTimeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AtentionTimeController],
      providers: [AtentionTimeService],
    }).compile();

    controller = module.get<AtentionTimeController>(AtentionTimeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
