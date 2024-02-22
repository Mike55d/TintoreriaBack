import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { EmailSettingsService } from './email-settings.service';
import { CreateEmailSettingsDto } from './dto/create-email-settings.dto';
import { UpdateEmailSettingsDto } from './dto/update-email-settings.dto';
import { GetMailboxFoldersDto } from './dto/get-mailbox-folders.dto';
import { EmailService } from './email.service';
import { FAKE_FOLDERS } from './constants';

@Controller('email-settings')
export class EmailSettingsController {
  constructor(
    private readonly emailSettingsService: EmailSettingsService,
    private readonly emailService: EmailService
  ) {}

  @Get('/mailbox-folders')
  async getMailboxFolders(@Query() params: GetMailboxFoldersDto) {
    return this.emailService.listMailFolders(params.mailbox);
  }

  @Get('/fake-folders')
  async getFakeFolders() {
    return FAKE_FOLDERS;
  }

  @Post()
  create(@Body() createEmailNotificationDto: CreateEmailSettingsDto) {
    return this.emailSettingsService.create(createEmailNotificationDto);
  }

  @Get()
  findAll() {
    return this.emailSettingsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.emailSettingsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmailNotificationDto: UpdateEmailSettingsDto) {
    return this.emailSettingsService.update(+id, updateEmailNotificationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.emailSettingsService.remove(+id);
  }
}
