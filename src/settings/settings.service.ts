import { Injectable } from '@nestjs/common';
import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Setting } from './entities/setting.entity';
import { Repository } from 'typeorm';
import sanitizeHtml from 'sanitize-html';
import { SANITIZE_CONFIG } from '../email/constants';

@Injectable()
export class SettingsService {
  constructor(
    @InjectRepository(Setting)
    private settingRepository: Repository<Setting>
  ) {}

  async create() {
    const newSettingConfig = this.settingRepository.create({
      domain: null,
      id: 1,
      signature: null
    });

    return await this.settingRepository.save(newSettingConfig);
  }

  async find() {
    const config = await this.settingRepository.find();

    if (!config.length) {
      return await this.create();
    } else {
      return config[0];
    }
  }

  async update(updateSettingDto: UpdateSettingDto) {
    await this.find();

    return this.settingRepository.update(1, {
      ...updateSettingDto,
      signature: sanitizeHtml(updateSettingDto.signature, SANITIZE_CONFIG)
    });
  }
}
