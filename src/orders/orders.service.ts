import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { GetClientsDto } from '../clients/dto/get-clients.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>
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
        relations: [
          'garments',
          'garments.garment',
          'currency'
        ],
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
        currency: { id: updateOrderDto.currencyId }
      });
    } catch (error) {
      console.log(error);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
