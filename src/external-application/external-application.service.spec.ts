import { Test, TestingModule } from '@nestjs/testing';
import { ExternalApplicationService } from './external-application.service';

describe('ExternalApplicationService', () => {
  let service: ExternalApplicationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExternalApplicationService],
    }).compile();

    service = module.get<ExternalApplicationService>(ExternalApplicationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
