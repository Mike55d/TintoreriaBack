import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EmailSettingsService } from './email-settings.service';
import { CreateEmailSettingsDto } from './dto/create-email-settings.dto';
import { UpdateEmailSettingsDto } from './dto/update-email-settings.dto';

@Controller('email-settings')
export class EmailSettingsController {
  constructor(private readonly emailNotificationsService: EmailSettingsService) {}

  @Post()
  create(@Body() createEmailNotificationDto: CreateEmailSettingsDto) {
    return this.emailNotificationsService.create(createEmailNotificationDto);
  }

  @Get()
  findAll() {
    return this.emailNotificationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.emailNotificationsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmailNotificationDto: UpdateEmailSettingsDto) {
    return this.emailNotificationsService.update(+id, updateEmailNotificationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.emailNotificationsService.remove(+id);
  }
}
