import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import * as firebase from 'firebase-admin';
import * as path from 'path';
import { Notification } from './entities/notification.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { getApps } from 'firebase-admin/app';
import { Interval } from '@nestjs/schedule';
import { User } from '../users/entities/user.entity';

if (!getApps().length)
  firebase.initializeApp({
    credential: firebase.credential.cert(path.join(__dirname, '..', 'firebase-adminsdk.json'))
  });

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private notificationsRepository: Repository<Notification>,
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  create(createNotificationDto: CreateNotificationDto) {
    return 'This action adds a new notification';
  }

  async findAll(user: User) {
    return this.notificationsRepository.find({
      relations: ['ticket'],
      take: 10,
      order: { id: 'DESC' },
      where: {
        user: { id: user.id }
      }
    });
  }

  async viewedNotifications(user: User) {
    const notifications = await this.notificationsRepository.find({
      relations: ['ticket'],
      take: 10,
      order: { id: 'DESC' },
      where: {
        user: { id: user.id }
      }
    });
    for (const notification of notifications) {
      await this.notificationsRepository.update(notification.id, {
        seen: true
      });
    }
    return 'viewedNotifications';
  }

  findOne(id: number) {
    return `This action returns a #${id} notification`;
  }

  update(id: number, updateNotificationDto: UpdateNotificationDto) {
    return `This action updates a #${id} notification`;
  }

  remove(id: number) {
    return `This action removes a #${id} notification`;
  }

  // @Interval(60000)
  async sendFakeNotifications() {
    this.sendNotification('test', 'test body', 5);
    console.log('sending notifications');
  }

  async sendNotification(title: string, body: string, ticket_id: number) {
    try {
      const users = await this.usersRepository.find({
        where: {
          roles: { role: { name: In(['admin', 'tecnician', 'supervisor']) } }
        }
      });

      for (const user of users) {
        const newNotification = this.notificationsRepository.create({
          title,
          body,
          user: { id: user.id },
          ticket: { id: ticket_id }
        });
        await this.notificationsRepository.save(newNotification);
        if (user && user.deviceToken) {
          await firebase
            .messaging()
            .send({
              notification: { title, body },
              token: user.deviceToken
            })
            .catch((error: any) => {
              console.error(error);
            });
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
}
