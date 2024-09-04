import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { EmailSettingsService } from './email-settings.service';
import { CreateEmailSettingsDto } from './dto/create-email-settings.dto';
import { UpdateEmailSettingsDto } from './dto/update-email-settings.dto';
import { GetMailboxFoldersDto } from './dto/get-mailbox-folders.dto';
import { FAKE_FOLDERS } from './constants';

@Controller('email-settings')
export class EmailSettingsController {
  constructor(
    private readonly emailSettingsService: EmailSettingsService,
  ) {}

  @Get('/fake-folders')
  async getFakeFolders() {
    return FAKE_FOLDERS;
  }

  @Get()
  findOne() {
    return this.emailSettingsService.find();
  }

  @Patch()
  async update(@Body() updateEmailNotificationDto: UpdateEmailSettingsDto) {
    await this.emailSettingsService.update(updateEmailNotificationDto);
  }
}
