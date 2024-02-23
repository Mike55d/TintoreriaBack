import { Injectable } from '@nestjs/common';
import { CreateEmailSettingsDto } from './dto/create-email-settings.dto';
import { UpdateEmailSettingsDto } from './dto/update-email-settings.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EmailNotification } from './entities/email-notification.entity';
import { Repository } from 'typeorm';
import sanitizeHtml from 'sanitize-html';
import { SANITIZE_CONFIG } from './constants';

@Injectable()
export class EmailSettingsService {
  constructor(
    @InjectRepository(EmailNotification)
    private emailNotificationRepository: Repository<EmailNotification>
  ) {}

  create(createEmailNotificationDto: CreateEmailSettingsDto) {
    return 'This action adds a new emailNotification';
  }

  findAll() {
    return this.emailNotificationRepository.findOneBy({});
  }

  findOne(id: number) {
    return `This action returns a #${id} emailNotification`;
  }

  update(id: number, updateEmailNotificationDto: UpdateEmailSettingsDto) {
    return this.emailNotificationRepository.update(id, {
      ...updateEmailNotificationDto,
      iocTemplate: sanitizeHtml(updateEmailNotificationDto.iocTemplate, SANITIZE_CONFIG),
      ticketTemplate: sanitizeHtml(updateEmailNotificationDto.ticketTemplate, SANITIZE_CONFIG)
    });
  }

  remove(id: number) {
    return `This action removes a #${id} emailNotification`;
  }
}
