import { PartialType } from '@nestjs/swagger';
import { CreateNotifcationsTitleAlertDto } from './create-notifcations-title-alert.dto';

export class UpdateNotifcationsTitleAlertDto extends PartialType(CreateNotifcationsTitleAlertDto) {}
