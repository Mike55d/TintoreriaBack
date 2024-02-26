import { Controller, Body, Patch, Param, Get } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { UpdateSettingDto } from './dto/update-setting.dto';

@Controller('ticket-settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get()
  findOne() {
    return this.settingsService.find();
  }

  @Patch()
  async update(@Body() updateSettingDto: UpdateSettingDto) {
    return await this.settingsService.update(updateSettingDto);
  }
}
