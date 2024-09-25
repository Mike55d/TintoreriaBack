import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from './entities/company.entity';
import { GetCompaniesDto } from './dto/get-companies.dto';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private companiesRepository: Repository<Company>
  ) {}

  async create(createCompanyDto: CreateCompanyDto) {
    try {
      const currencyId = createCompanyDto.currencyId;
      delete createCompanyDto.currencyId;
      const company = this.companiesRepository.create({
        ...createCompanyDto,
        currency: { id: currencyId }
      });
      return await this.companiesRepository.save(company);
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async findAll(query: GetCompaniesDto) {
    const data = await this.companiesRepository.find({
      skip: query.skip,
      take: query.take,
      order: { id: 'DESC' },
      relations: ['currency']
    });
    const count = await this.companiesRepository.count();
    return { data: data.map(x => x.json), count };
  }

  async findOne(id: number) {
    const company = await this.companiesRepository.findOne({
      where: { id },
      relations: ['currency']
    });
    return company.json;
  }

  async update(id: number, updateCompanyDto: UpdateCompanyDto) {
    try {
      const currencyId = updateCompanyDto.currencyId;
      delete updateCompanyDto.currencyId;
      return await this.companiesRepository.update(id, {
        ...updateCompanyDto,
        currency: { id: currencyId }
      });
    } catch (error) {
      console.log(error);
    }
  }

  async remove(id: number) {
    const company = await this.companiesRepository.findOneBy({ id });

    if (company) {
      await this.companiesRepository.remove(company);
    }
  }
}
