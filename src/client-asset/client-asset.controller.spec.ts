import { Test, TestingModule } from '@nestjs/testing';
import { ClientAssetController } from './client-asset.controller';
import { ClientAssetService } from './client-asset.service';

describe('ClientAssetController', () => {
  let controller: ClientAssetController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientAssetController],
      providers: [ClientAssetService],
    }).compile();

    controller = module.get<ClientAssetController>(ClientAssetController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
