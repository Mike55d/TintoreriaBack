import { Injectable } from '@nestjs/common';
import { CreateGeneralPriceDto } from './dto/create-general-price.dto';
import { UpdateGeneralPriceDto } from './dto/update-general-price.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GeneralPrice } from './entities/general-price.entity';
import { Price } from '../prices/entities/price.entity';
import { Garment } from '../garments/entities/garment.entity';

@Injectable()
export class GeneralPricesService {
  constructor(
    @InjectRepository(GeneralPrice)
    private generalPricesRepository: Repository<GeneralPrice>,
    @InjectRepository(Price)
    private pricesRepository: Repository<Price>,
    @InjectRepository(Garment)
    private garmentsRepository: Repository<Garment>
  ) {}

  async create(createGeneralPriceDto: CreateGeneralPriceDto) {
    try {
      const generalPrice = await this.generalPricesRepository.findOne({
        where: { currency: { id: createGeneralPriceDto.currencyId } }
      });
      if (!generalPrice) {
        const newGeneralPrice = this.generalPricesRepository.create({
          ...createGeneralPriceDto,
          currency: { id: createGeneralPriceDto.currencyId }
        });
        await this.generalPricesRepository.save(newGeneralPrice);
      } else {
        await this.generalPricesRepository.update(generalPrice.id, {
          ...createGeneralPriceDto,
          currency: { id: createGeneralPriceDto.currencyId }
        });
      }

      const prices = createGeneralPriceDto.prices.map(price =>
        this.pricesRepository.create({
          id: price.id,
          currency: { id: createGeneralPriceDto.currencyId },
          garment: { id: price.garmentId },
          type: price.type,
          price: price.price
        })
      );
      this.pricesRepository.save(prices);
      return 'This action adds a new generalPrice';
    } catch (error) {
      console.log(error);
    }
  }

  async findAll(currencyId: number) {
    try {
      const generalPrice = await this.generalPricesRepository.findOne({
        where: { currency: { id: currencyId } }
      });
      const garmentsWithPrice = await this.garmentsRepository
        .createQueryBuilder('garment')
        .leftJoinAndMapOne(
          'garment.price',
          subQuery =>
            subQuery
              .select('price.price', 'price')
              .addSelect('price.type', 'type')
              .addSelect('price.garment_id')
              .from(Price, 'price')
              .where('price.currency_id = :currencyId', { currencyId }),
          'price',
          'price.garment_id = garment.id'
        )
        .addSelect('garment.name', 'name')
        .addSelect('garment.id', 'id')
        .getRawMany();
      return { generalPrice, garmentsWithPrice };
    } catch (error) {
      console.log(error);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} generalPrice`;
  }

  update(id: number, updateGeneralPriceDto: UpdateGeneralPriceDto) {
    return `This action updates a #${id} generalPrice`;
  }

  remove(id: number) {
    return `This action removes a #${id} generalPrice`;
  }
}
