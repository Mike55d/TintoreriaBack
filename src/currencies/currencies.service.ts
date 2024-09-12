import { Injectable } from '@nestjs/common';
import { CreateCurrencyDto } from './dto/create-currency.dto';
import { UpdateCurrencyDto } from './dto/update-currency.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Currency } from './entities/currency.entity';

@Injectable()
export class CurrenciesService {
  constructor(
    @InjectRepository(Currency)
    private currenciesRepository: Repository<Currency>
  ) {}

  async create(createCurrencyDto: CreateCurrencyDto) {
    try {
      const newCurrency = this.currenciesRepository.create(createCurrencyDto);
      return await this.currenciesRepository.save(newCurrency);
    } catch (error) {
      console.log(error);
    }
  }

  async findAll() {
    return await this.currenciesRepository.find({});
  }

  async findOne(id: number) {
    return await this.currenciesRepository.findOne({ where: { id } });
  }

  async update(id: number, updateCurrencyDto: UpdateCurrencyDto) {
    return this.currenciesRepository.update(id, updateCurrencyDto);
  }

  async remove(id: number) {
    const currency = await this.findOne(id);
    if (currency) {
      try {
        return await this.currenciesRepository.remove(currency);
      } catch (error) {
        console.log(error);
      }
    }
    return `This action removes a #${id} currency`;
  }
}
