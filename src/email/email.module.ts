import { Module, forwardRef } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailSettingsService } from './email-settings.service';
import { EmailSettingsController } from './email-settings.controller'; 
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailSetting } from './entities/email-notification.entity';
import { SettingsModule } from '../settings/settings.module';
import { ClientsModule } from '../clients/clients.module';
import { TicketsModule } from '../tickets/tickets.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [forwardRef(() => TicketsModule), SettingsModule, UsersModule, ClientsModule, TypeOrmModule.forFeature([EmailSetting])],
  providers: [EmailService, EmailSettingsService],
  exports: [EmailService, EmailSettingsService],
  controllers: [EmailSettingsController]
})
export class EmailModule {}
