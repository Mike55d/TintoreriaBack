import { Test, TestingModule } from '@nestjs/testing';
import { NotifcationsTitleAlertController } from './notifcations-title-alert.controller';
import { NotifcationsTitleAlertService } from './notifcations-title-alert.service';

describe('NotifcationsTitleAlertController', () => {
  let controller: NotifcationsTitleAlertController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotifcationsTitleAlertController],
      providers: [NotifcationsTitleAlertService],
    }).compile();

    controller = module.get<NotifcationsTitleAlertController>(NotifcationsTitleAlertController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
