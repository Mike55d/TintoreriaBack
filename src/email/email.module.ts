import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailSettingsService } from './email-settings.service';
import { EmailSettingsController } from './email-settings.controller'; 
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailNotification } from './entities/email-notification.entity';
import { SettingsModule } from '../settings/settings.module';

@Module({
  imports: [SettingsModule, TypeOrmModule.forFeature([EmailNotification])],
  providers: [EmailService, EmailSettingsService],
  exports: [EmailService, EmailSettingsService],
  controllers: [EmailSettingsController]
})
export class EmailModule {}
