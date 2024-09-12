import { Injectable } from '@nestjs/common';
import { CreatePriceDto } from './dto/create-price.dto';
import { UpdatePriceDto } from './dto/update-price.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Price } from './entities/price.entity';

@Injectable()
export class PricesService {
  constructor(
    @InjectRepository(Price)
    private pricesRepository: Repository<Price>
  ) {}

  async create(createPriceDto: CreatePriceDto) {
    try {
      const price = this.pricesRepository.create(createPriceDto);
      return await this.pricesRepository.save(price);
    } catch (error) {
      console.log(error);
    }
  }

  async findAll() {
    return await this.pricesRepository.find({});
  }

  async findOne(id: number) {
    return await this.pricesRepository.findOne({ where: { id } });
  }

  async update(id: number, updatePriceDto: UpdatePriceDto) {
    try {
      return await this.pricesRepository.update(id, updatePriceDto);
    } catch (error) {
      console.log(error);
    }
  }

  async remove(id: number) {
    const price = await this.findOne(id);
    if (price) {
      try {
        return await this.pricesRepository.remove(price);
      } catch (error) {
        console.log(error);
      }
    }
    return `This action removes a #${id} price`;
  }
}
