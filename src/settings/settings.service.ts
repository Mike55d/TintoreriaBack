import { Injectable } from '@nestjs/common';
import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Settings } from './entities/settings.entity';

@Injectable()
export class SettingsService {
  constructor(
    @InjectRepository(Settings)
    private settingsRepository: Repository<Settings>
  ) {}

  async create(createSettingDto: CreateSettingDto) {
    try {
      const settings = await this.settingsRepository.findOneBy({});
      if (settings) {
        return await this.settingsRepository.update(settings.id, createSettingDto);
      } else {
        const newSettings = this.settingsRepository.create(createSettingDto);
        return await this.settingsRepository.save(newSettings);
      }
    } catch (error) {
      console.log(error);
    }
  }

  findAll() {
    return this.settingsRepository.findOneBy({});
  }

  findOne(id: number) {
    return `This action returns a #${id} setting`;
  }

  update(id: number, updateSettingDto: UpdateSettingDto) {
    return `This action updates a #${id} setting`;
  }

  remove(id: number) {
    return `This action removes a #${id} setting`;
  }
}
