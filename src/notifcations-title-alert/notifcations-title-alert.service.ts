import { Injectable } from '@nestjs/common';
import { CreateNotifcationsTitleAlertDto } from './dto/create-notifcations-title-alert.dto';
import { UpdateNotifcationsTitleAlertDto } from './dto/update-notifcations-title-alert.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotifcationsTitleAlert } from './entities/notifcations-title-alert.entity';

@Injectable()
export class NotifcationsTitleAlertService {
  constructor(
    @InjectRepository(NotifcationsTitleAlert)
    private notifcationsTitleAlertRepository: Repository<NotifcationsTitleAlert>
  ) {}

  create(createNotifcationsTitleAlertDto: CreateNotifcationsTitleAlertDto) {
    const newNotification = this.notifcationsTitleAlertRepository.create({
      alertTitle: { id: createNotifcationsTitleAlertDto.alertTitle },
      emails: createNotifcationsTitleAlertDto.emails
    });
    return this.notifcationsTitleAlertRepository.save(newNotification);
  }

  findAll() {
    return this.notifcationsTitleAlertRepository.find({ relations: ['alertTitle'] });
  }

  findOne(id: number) {
    return this.notifcationsTitleAlertRepository.findOne({
      where: { id },
      relations: ['alertTitle']
    });
  }

  update(id: number, updateNotifcationsTitleAlertDto: UpdateNotifcationsTitleAlertDto) {
    return this.notifcationsTitleAlertRepository.save({
      id,
      ...updateNotifcationsTitleAlertDto,
      alertTitle: { id: updateNotifcationsTitleAlertDto.alertTitle }
    });
  }

  async remove(id: number) {
    const notification = await this.notifcationsTitleAlertRepository.findBy({ id });
    return await this.notifcationsTitleAlertRepository.remove(notification);
  }
}
