import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { GetClientsDto } from '../clients/dto/get-clients.dto';
import { ChangeStatusDto } from './dto/change-status.dto';
import { History } from './entities/history.entity';
import { Cron, CronExpression } from '@nestjs/schedule';
import moment from 'moment';
import { Status } from './orders.type';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    @InjectRepository(History)
    private historyRepository: Repository<History>
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    try {
      const garments: any = createOrderDto.garments.map(garment => ({
        quantity: garment.quantity,
        ironingOnly: garment.ironingOnly,
        garment: { id: garment.garmentId },
        price: garment.price,
        total: garment.total
      }));
      const order = this.ordersRepository.create({
        garments,
        status: 0,
        endDate: createOrderDto.endDate ?? null,
        currency: { id: createOrderDto.currencyId }
      });
      return await this.ordersRepository.save(order);
    } catch (error) {
      console.log(error);
    }
  }

  async findAll(query: GetClientsDto) {
    try {
      const data = await this.ordersRepository.find({
        skip: query.skip,
        take: query.take,
        order: { id: 'DESC' },
        relations: ['garments', 'garments.garment']
      });
      const count = await this.ordersRepository.count();
      return { data, count };
    } catch (error) {
      console.log(error);
    }
  }

  async findOne(id: number) {
    try {
      const order = await this.ordersRepository.findOne({
        relations: ['garments', 'garments.garment', 'currency', 'historyEntries'],
        where: { id }
      });
      return order.json;
    } catch (error) {
      console.log(error);
    }
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    try {
      const garments: any = updateOrderDto.garments.map(garment => ({
        id: garment.id,
        quantity: garment.quantity,
        ironingOnly: garment.ironingOnly,
        garment: { id: garment.garmentId },
        price: garment.price,
        total: garment.total
      }));
      return await this.ordersRepository.save({
        id,
        garments,
        endDate: updateOrderDto.endDate ?? null,
        currency: { id: updateOrderDto.currencyId }
      });
    } catch (error) {
      console.log(error);
    }
  }

  async remove(id: number) {
    const order = await this.ordersRepository.findOneBy({ id });
    if (order) {
      try {
        return await this.ordersRepository.remove(order);
      } catch (error) {
        console.log(error);
      }
    }
    return `This action removes a #${id} order`;
  }

  async changeStatus(id: number, changeStatusDto: ChangeStatusDto) {
    const newHistory = this.historyRepository.create({
      order: { id },
      status: changeStatusDto.statusId
    });
    await this.historyRepository.save(newHistory);
    return await this.ordersRepository.update(id, {
      status: changeStatusDto.statusId
    });
  }

  @Cron(CronExpression.EVERY_DAY_AT_10AM)
  async ordersLate() {
    try {
      const ordersOutTime = await this.ordersRepository
        .createQueryBuilder('order')
        .where('order.endDate is not null')
        .andWhere('order.status != 3')
        .andWhere('order.endDate < :today', { today: new Date() })
        .getMany();
      for (let order of ordersOutTime) {
        await this.ordersRepository.update(order.id, { status: Status.LATE });
        const newHistory = this.historyRepository.create({
          order: { id: order.id },
          status: Status.LATE
        });
        await this.historyRepository.save(newHistory);
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
