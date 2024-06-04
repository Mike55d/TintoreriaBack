import { Test, TestingModule } from '@nestjs/testing';
import { ExternalApplicationController } from './external-application.controller';
import { ExternalApplicationService } from './external-application.service';

describe('ExternalApplicationController', () => {
  let controller: ExternalApplicationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExternalApplicationController],
      providers: [ExternalApplicationService],
    }).compile();

    controller = module.get<ExternalApplicationController>(ExternalApplicationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
