import { Injectable } from '@nestjs/common';
import { CreateGarmentDto } from './dto/create-garment.dto';
import { UpdateGarmentDto } from './dto/update-garment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Garment } from './entities/garment.entity';

@Injectable()
export class GarmentsService {
  constructor(
    @InjectRepository(Garment)
    private garmentsRepository: Repository<Garment>
  ) {}

  async create(createGarmentDto: CreateGarmentDto) {
    const prices = createGarmentDto.prices.map(price => ({
      ...price,
      currency: {
        id: price.currencyId
      }
    }));
    try {
      const garment = this.garmentsRepository.create({ ...createGarmentDto, prices });
      return await this.garmentsRepository.save(garment);
    } catch (error) {
      console.log(error);
    }
  }

  async findAll() {
    return await this.garmentsRepository.find({ relations: ['prices', 'prices.currency'] });
  }

  async findOne(id: number) {
    return await this.garmentsRepository.find({
      where: { id },
      relations: ['prices', 'prices.currency']
    });
  }

  async update(id: number, updateGarmentDto: UpdateGarmentDto) {
    // console.log(updateGarmentDto);
    try {
      const prices = updateGarmentDto.prices.map(price => ({
        ...price,
        currency: {
          id: price.currencyId
        }
      }));
      return await this.garmentsRepository.save({
        id,
        ...updateGarmentDto,
        prices
      });
    } catch (error) {
      console.log(error);
    }
  }

  async remove(id: number) {
    const garment = await this.findOne(id);
    if (garment) {
      try {
        return await this.garmentsRepository.remove(garment);
      } catch (error) {
        console.log(error);
      }
    }
    return `This action removes a #${id} garment`;
  }
}
