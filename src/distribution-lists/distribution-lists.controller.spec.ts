import { Test, TestingModule } from '@nestjs/testing';
import { DistributionListsController } from './distribution-lists.controller';
import { DistributionListsService } from './distribution-lists.service';

describe('DistributionListsController', () => {
  let controller: DistributionListsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DistributionListsController],
      providers: [DistributionListsService],
    }).compile();

    controller = module.get<DistributionListsController>(DistributionListsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
