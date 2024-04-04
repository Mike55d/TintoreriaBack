import { Injectable } from '@nestjs/common';
import { UpdateEmailSettingsDto } from './dto/update-email-settings.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EmailSetting } from './entities/email-notification.entity';
import { DeepPartial, Repository } from 'typeorm';
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
      systemDomain: process.env.MS_365_DOMAIN
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
    const currentDate = await this.find();

    const updateData: DeepPartial<EmailSetting> = {
      ...updateEmailNotificationDto
    };

    if (updateEmailNotificationDto.iocTemplate) {
      updateData.iocTemplate = updateEmailNotificationDto.iocTemplate;
    }

    if (updateEmailNotificationDto.iocTemplate) {
      updateData.ticketTemplate = updateEmailNotificationDto.ticketTemplate;
    }

    if (updateEmailNotificationDto.iocTemplate) {
      updateData.systemSignature = updateEmailNotificationDto.systemSignature;
    }

    if (updateEmailNotificationDto.iocTemplate) {
      updateData.collectorResponse = updateEmailNotificationDto.collectorResponse;
    }

    if (updateEmailNotificationDto.collectorEnabled && !currentDate.lastEmailDatetime) {
      updateData.lastEmailDatetime = new Date();
    }

    return this.emailNotificationRepository.update(1, updateData);
  }
}
