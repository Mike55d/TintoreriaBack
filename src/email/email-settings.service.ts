import { Injectable } from '@nestjs/common';
import { UpdateEmailSettingsDto } from './dto/update-email-settings.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EmailSetting } from './entities/email-notification.entity';
import { Repository } from 'typeorm';
import sanitizeHtml from 'sanitize-html';
import { SANITIZE_CONFIG } from './constants';

@Injectable()
export class EmailSettingsService {
  constructor(
    @InjectRepository(EmailSetting)
    private emailNotificationRepository: Repository<EmailSetting>
  ) {}

  async create() {
    const newSettingConfig = this.emailNotificationRepository.create({
      id: 1,
      collectorMailbox: process.env.MS_365_DOMAIN
    });

    return await this.emailNotificationRepository.save(newSettingConfig);
  }

  async find() {
    const config = await this.emailNotificationRepository.find();

    if (!config.length) {
      return await this.create();
    } else {
      return config[0];
    }
  }

  async update(updateEmailNotificationDto: UpdateEmailSettingsDto) {
    await this.find();

    return this.emailNotificationRepository.update(1, {
      ...updateEmailNotificationDto,
      iocTemplate: sanitizeHtml(updateEmailNotificationDto.iocTemplate, SANITIZE_CONFIG),
      ticketTemplate: sanitizeHtml(updateEmailNotificationDto.ticketTemplate, SANITIZE_CONFIG),
      systemSignature: sanitizeHtml(updateEmailNotificationDto.systemSignature, SANITIZE_CONFIG)
    });
  }
}
