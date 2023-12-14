import { Test, TestingModule } from '@nestjs/testing';
import { ClientAssetService } from './client-asset.service';

describe('ClientAssetService', () => {
  let service: ClientAssetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientAssetService],
    }).compile();

    service = module.get<ClientAssetService>(ClientAssetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
