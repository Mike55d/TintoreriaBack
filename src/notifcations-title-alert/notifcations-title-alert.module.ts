import { Module } from '@nestjs/common';
import { NotifcationsTitleAlertService } from './notifcations-title-alert.service';
import { NotifcationsTitleAlertController } from './notifcations-title-alert.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotifcationsTitleAlert } from './entities/notifcations-title-alert.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NotifcationsTitleAlert])],
  controllers: [NotifcationsTitleAlertController],
  providers: [NotifcationsTitleAlertService]
})
export class NotifcationsTitleAlertModule {}
