import { Module, forwardRef } from '@nestjs/common';
import { EmailSettingsService } from './email-settings.service';
import { EmailSettingsController } from './email-settings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailSetting } from './entities/email-notification.entity';
import { UsersModule } from '../users/users.module';
import { Log } from '../logs/entities/logs.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([EmailSetting, Log, User])],
  providers: [EmailSettingsService],
  exports: [EmailSettingsService],
  controllers: [EmailSettingsController]
})
export class EmailModule {}
