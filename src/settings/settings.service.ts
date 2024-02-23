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

  create(createSettingDto: CreateSettingDto) {
    return 'This action adds a new setting';
  }

  findAll() {
    return this.settingRepository.findOneBy({});
  }

  findOne(id: number) {
    return `This action returns a #${id} setting`;
  }

  update(id: number, updateSettingDto: UpdateSettingDto) {
    return this.settingRepository.update(id, {
      ...updateSettingDto,
      signature: sanitizeHtml(updateSettingDto.signature, SANITIZE_CONFIG)
    });
  }

  remove(id: number) {
    return `This action removes a #${id} setting`;
  }
}
