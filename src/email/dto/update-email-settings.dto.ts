import { PartialType } from '@nestjs/swagger';
import { CreateEmailSettingsDto } from './create-email-settings.dto';

export class UpdateEmailSettingsDto extends PartialType(CreateEmailSettingsDto) {}
