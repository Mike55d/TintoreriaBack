import { Injectable } from '@nestjs/common';
import { CreateEmailSettingsDto } from './dto/create-email-settings.dto';
import { UpdateEmailSettingsDto } from './dto/update-email-settings.dto';

@Injectable()
export class EmailSettingsService {
  create(createEmailNotificationDto: CreateEmailSettingsDto) {
    return 'This action adds a new emailNotification';
  }

  findAll() {
    return `This action returns all emailNotifications`;
  }

  findOne(id: number) {
    return `This action returns a #${id} emailNotification`;
  }

  update(id: number, updateEmailNotificationDto: UpdateEmailSettingsDto) {
    return `This action updates a #${id} emailNotification`;
  }

  remove(id: number) {
    return `This action removes a #${id} emailNotification`;
  }
}
