import { Test, TestingModule } from '@nestjs/testing';
import { NotifcationsTitleAlertService } from './notifcations-title-alert.service';

describe('NotifcationsTitleAlertService', () => {
  let service: NotifcationsTitleAlertService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NotifcationsTitleAlertService],
    }).compile();

    service = module.get<NotifcationsTitleAlertService>(NotifcationsTitleAlertService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
