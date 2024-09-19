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
        return await this.settingsRepository.update(settings.id, {
          currency: { id: createSettingDto.currencyId }
        });
      } else {
        const newSettings = this.settingsRepository.create({
          currency: { id: createSettingDto.currencyId }
        });
        return await this.settingsRepository.save(newSettings);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async findAll() {
    try {
      const settings = await this.settingsRepository.findOne({
        relations: ['currency'],
        where: {}
      });
      return settings.json;
    } catch (error) {
      console.log(error);
    }
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
